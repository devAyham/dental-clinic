import { join } from 'path';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { DiseaseModule } from './graphql/disease/disease.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BadHabitModule } from './graphql/bad_habit/bad_habit.module';
import { TreatmentTypeModule } from './graphql/treatment_type/treatment_type.module';
import { AuthModule } from './auth/auth.module';
import { ProblemTypeModule } from './graphql/problem_type/problem_type.module';
import { ChemicalMaterialModule } from './graphql/chemical_material/chemical_material.module';
import { ConfigModule } from '@nestjs/config';
import { TreatmentModule } from './graphql/treatment/treatment.module';
import { MedicineModule } from './graphql/medicine/medicine.module';
import { CategoryModule } from './graphql/category/category.module';
import { PatientModule } from './graphql/patient_management/patient/patient.module';
import { PatientBadHabitsModule } from './graphql/patient_management/patient_bad-habits/patient_bad-habits.module';
import { PatientMedicinesModule } from './graphql/patient_management/patient_medicines/patient_medicines.module';
import { PatientPaymentsModule } from './graphql/patient_management/patient_payments/patient_payments.module';
import { PatientCostsModule } from './graphql/patient_management/patient_costs/patient_costs.module';
import { PatientDiagnosesModule } from './graphql/patient_management/patient_diagnoses/patient_diagnoses.module';
import { PatientMedicalImagesModule } from './graphql/patient_management/images/patient_medical_images/patient_medical_images.module';
import { PatientMedicalImagesTypesModule } from './graphql/patient_management/images/patient_medical_images_types/patient_medical_images_types.module';
import { PatientTeethTreatmentsModule } from './graphql/patient_management/patient_teeth_treatments/patient_teeth_treatments.module';
import { PatientDiseasesModule } from './graphql/patient_management/patient_diseases/patient_diseases.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ImagesUploaderService } from './images_uploader/images_uploader.service';
import { ProblemModule } from './graphql/problem/problem.module';
import { PatientAppointmentsModule } from './graphql/patient_management/patient_appointments/patient_appointments.module';
import { PatientSessionsModule } from './graphql/patient_management/patient_sessions/patient_sessions.module';
import { PatientTreatmentsModule } from './graphql/patient_management/patient_treatments/patient_treatments.module';
import { PatientPerscrptionsModule } from './graphql/patient_management/patient_perscrptions/patient_perscrptions.module';
import { PatientReservationsModule } from './graphql/patient_management/patient_reservations/patient_reservations.module';
import { PatientLabOrdersModule } from './graphql/patient_management/patient_lab_orders/patient_lab_orders.module';
import { WorkingHoursModule } from './graphql/patient_management/working_hours/working_hours.module';
import { PatientPerscrptionsMediciensModule } from './graphql/patient_management/patient_perscrptions_mediciens/patient_perscrptions_mediciens.module';
import { ProductModule } from './graphql/store/product/product.module';
import { StoredProductModule } from './graphql/store/stored_product/stored_product.module';
import { BookInModule } from './graphql/store/book_in/book_in.module';
import { BookOutModule } from './graphql/store/book_out/book_out.module';
import { PatientTreatmentDoneStepsModule } from './graphql/patient_management/patient_treatment_done_steps/patient_treatment_done_steps.module';
import { LabOrderModule } from './graphql/lab_order/lab_order.module';

import { AccessTokenGuard } from './auth/guards/accessToken.guard';
import { APP_GUARD } from '@nestjs/core';
import { LabModule } from './graphql/lab/lab.module';
import { NotificationModule } from './graphql/notification/notification.module';


const apolloDriverConfig: ApolloDriverConfig = {
  formatError: (error: any) => {
    const graphQLFormattedError = {
      message: error.message || 'SERVER_ERROR',
      code: error.extensions?.code || error.code || 500,
    };
    return graphQLFormattedError;
  },
  driver: ApolloDriver,

  playground: true,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  sortSchema: true,
  status400ForVariableCoercionErrors: true,
  includeStacktraceInErrorResponses: true,
};

const graphQLModuleConfig: any = {
  ...apolloDriverConfig,
};

const serveStaticImagesConfig = {
  rootPath: join(process.env.host, '..', 'public'), // Specify the root path of your image directory
  serveRoot: '/public',
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot(serveStaticImagesConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>(graphQLModuleConfig),
    PrismaModule,
    DiseaseModule,
    BadHabitModule,
    TreatmentTypeModule,
    AuthModule,
    ProblemTypeModule,
    ProblemModule,
    ChemicalMaterialModule,
    TreatmentModule,
    MedicineModule,
    CategoryModule,
    PatientModule,
    PatientBadHabitsModule,
    PatientMedicinesModule,
    PatientPaymentsModule,
    PatientCostsModule,
    PatientDiagnosesModule,
    PatientTeethTreatmentsModule,
    PatientDiseasesModule,
    PatientMedicalImagesModule,
    PatientMedicalImagesTypesModule,
    ProductModule,
    StoredProductModule,
    BookInModule,
    BookOutModule,
    PatientAppointmentsModule,
    PatientSessionsModule,
    PatientTreatmentsModule,
    PatientPerscrptionsModule,
    PatientReservationsModule,
    PatientLabOrdersModule,
    WorkingHoursModule,
    PatientPerscrptionsMediciensModule,
    PatientTreatmentDoneStepsModule,
    LabOrderModule,
    LabModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ImagesUploaderService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AccessTokenGuard,
    // },
  ],
})
export class AppModule {}
