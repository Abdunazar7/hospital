import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";

import { UsersModule } from './users/user.module'
import { PatientsModule } from './patients/patient.module';
import { DoctorsModule } from './doctors/doctors.module';
import { MedicationsModule } from './medications/medications.module';
import { MedicalRecordsModule } from './medical_records/medical_records.module';
import { PaymentsModule } from './payments/payments.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { LabTestsModule } from './lab_tests/lab_tests.module';
import { PrescriptionsModule } from './prescriptions/prescriptions.module';
import { PrescriptionItemsModule } from './prescription_items/prescription_items.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),

    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      autoLoadModels: true,
      sync: {alter: true},
      logging: false,
    }),

    UsersModule,

    PatientsModule,

    DoctorsModule,

    MedicationsModule,

    MedicalRecordsModule,

    PaymentsModule,

    AppointmentsModule,

    LabTestsModule,

    PrescriptionsModule,

    PrescriptionItemsModule,

    AuthModule,

    MailModule,

    AdminsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
