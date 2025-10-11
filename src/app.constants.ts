import { SetMetadata } from "@nestjs/common";

export enum UserRole {
  USER = 'USER',
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  STAFF = 'STAFF',
  ADMIN = 'ADMIN',
}

export const ROLES_KEY = "roles";
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
