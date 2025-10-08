import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser";

async function start() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn",],
  });

  app.use(cookieParser());
  app.setGlobalPrefix("api");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Hospital Management System API")
    .setDescription(
      "A private hospital management backend built with NestJS, PostgreSQL, Sequelize ORM, and JWT authentication. This API provides functionalities for users (admins, doctors, patients, and staff), appointments, medical records, prescriptions, and payments."
    )
    .setVersion("1.0")
    .addBearerAuth()
    .addTag("Users", "User management endpoints")
    .addTag("Doctors", "Doctor management endpoints")
    .addTag("Patients", "Patient management endpoints")
    .addTag("Appointments", "Appointment management endpoints")
    .addTag("MedicalRecords", "Medical record management endpoints")
    .addTag("Prescriptions", "Prescription management endpoints")
    .addTag("Payments", "Payment management endpoints")
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api/docs", app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  console.log(`Server started at http://localhost:${PORT}/api`);
  console.log(`Server docs at http://localhost:${PORT}/api/docs`);
}

start();
