import { Injectable } from '@nestjs/common';
import { CreateMedicineInput } from './dto/create-medicine.input';
import { UpdateMedicineInput } from './dto/update-medicine.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatorService } from 'src/pagination/PaginatorService';
import { Prisma } from '@prisma/client';
import { GraphQLError } from 'graphql';
import {
  Conflict_Diseases_Medicine,
  Conflict_bad_habit_Medicine,
  checkConflictsByIds,
  checkConflictsByMedicinesIds,
  getChemicalMaterialFromMedicines,
  getPatientBadHabitIds,
  getPatientDiseasesIds,
  getPatientMedicinesIds,
} from '../chemical_material/ChemicalHelper';
import { Conflict } from './entities/conflict';

@Injectable()
export class MedicineService {
  constructor(private prisma: PrismaService) {}

  async create(createMedicineInput: CreateMedicineInput) {
    const { name, concentration, category_id, chemical_material_id } =
      createMedicineInput;

    const chemical_materials_id_array: any[] = chemical_material_id.map(
      (id) => {
        return { chemical_material_id: id };
      },
    );
    //create new medicine
    const medicine = await this.prisma.medicine.create({
      data: {
        medicineChemicalMaterials: {
          createMany: {
            data: chemical_materials_id_array,
          },
        },
        name: name,
        concentration: concentration,
        category: {
          connect: {
            id: category_id,
          },
        },
      },
      include: {
        category: true,
      },
    });

    //attach data chemical_material_id and medicine_id in pivot table
    // await this.prisma.medicineChemicalMaterial.createMany({
    //   data: createMedicineInput.chemical_material_id.map((id) => ({
    //     chemical_material_id: id,
    //     medicine_id: medicine.id,
    //   })),
    // });

    return medicine;
  }

  //need relation with category
  async findAll(page: any, item_per_page: any, search?: string) {
    return await PaginatorService<Prisma.MedicineFindManyArgs>({
      Modal: this.prisma.medicine,
      item_per_page,
      page,
      search,
      relations: {
        include: {
          category: true,
          medicineChemicalMaterials: {
            include: {
              chemical_material: true,
            },
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.medicine.findUnique({
      where: { id },
      include: {
        category: true,
        medicineChemicalMaterials: {
          include: {
            chemical_material: true,
          },
        },
      },
    });
  }

  async update(
    id: number,
    {
      category_id,
      chemical_material_id,
      concentration,
      name,
    }: UpdateMedicineInput,
  ) {
    await this.prisma.medicineChemicalMaterial.deleteMany({ where: { id } });

    //attach data chemical_material_id and medicine_id in pivot table
    await this.prisma.medicineChemicalMaterial.createMany({
      data: chemical_material_id.map((chemical_id) => ({
        chemical_material_id: chemical_id,
        medicine_id: id,
      })),
    });

    return await this.prisma.medicine.update({
      where: { id },
      data: {
        category_id,
        concentration,
        name,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.medicine.delete({ where: { id } });
  }

  async medicineConflicts(patient_id = 2, medicineArray = [1, 2]) {
    const bad_habit_ids = await getPatientBadHabitIds(patient_id);
    const diseases_ids = await getPatientDiseasesIds(patient_id);
    const patient_medicine_ids = await getPatientMedicinesIds(patient_id);

    let prescription_patient_medicine = [];
    for (let i = 0; i < medicineArray.length; i++) {
      prescription_patient_medicine.push(
        await checkConflictsByMedicinesIds([
          ...patient_medicine_ids,
          medicineArray[i],
        ]),
      );
    }
    prescription_patient_medicine = prescription_patient_medicine.filter(
      (item) => {
        if (item.length > 0) return item;
      },
    );

    const prescription_medicines = await checkConflictsByMedicinesIds(
      medicineArray,
    );

    const bad_habit_medicine = await Conflict_bad_habit_Medicine(
      medicineArray,
      bad_habit_ids,
    );

    const disease_medicine = await Conflict_Diseases_Medicine(
      medicineArray,
      diseases_ids,
    );

    return {
      bool:
        prescription_patient_medicine.length > 0 ||
        prescription_medicines.length > 0 ||
        bad_habit_medicine.length > 0 ||
        disease_medicine.length > 0,

      prescription_patient_medicine,
      prescription_medicines,
      bad_habit_medicine,
      disease_medicine,
    };
  }
}
