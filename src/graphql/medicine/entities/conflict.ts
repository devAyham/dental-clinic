import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { badHabitConflict } from './conflicts/bad_habit_conflicts';
import { medicineConflicts } from './conflicts/medicine_conflicts';


@ObjectType()
export class Conflict {
  @Field(() => Boolean, )
  bool: boolean;

  @Field(() => [[medicineConflicts]], { description: 'name field ',nullable:true })
  prescription_patient_medicine?: [[medicineConflicts]];


  @Field(() => [medicineConflicts], { description: 'name field ',nullable:true })
  prescription_medicines?: [medicineConflicts];


  @Field(() => [badHabitConflict], { description: 'name field ',nullable:true })
  bad_habit_medicine: [badHabitConflict];

  @Field(() => [badHabitConflict], { description: 'name field ',nullable:true })
  disease_medicine: [badHabitConflict];


}
