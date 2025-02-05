import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedImageType() {
    const imageTypes = [
      {
        id: 1,
        name: 'شعاعية',
      },
      {
        id: 2,
        name: 'شمسية'
      },
    ];
  
    for (const { id, name } of imageTypes) {
      const imageType = await prisma.patientMedicalImageType.upsert({
        where: { id },
        update: {},
        create: {
          name,
        //   PatientMedicalImage:{
        //     createMany:{
        //       data:[
        //         {
        //           patient_id:1,
        //           src:"dasas das",
        //           title:"sda",
        //         },
        //         {
        //           patient_id:2,
        //           src:"dasas das",
        //           title:"a sdhasd",
        //         },
        //         {
        //           patient_id:2,
        //           src:"dasas das",
        //           title:"a sdhasd",
        //         }
        //       ]
        //     }
        //   }
          
        },
      });
    }
  }