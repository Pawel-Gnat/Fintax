import { Department, Employee, Location, Settlement } from '@prisma/client';

export type SafeEmployee = Employee & {
  department: Department | null;
  location: Location | null;
  settlements: [];
};

export type SafeSettlement = Settlement & {
  employee: Employee | null;
};
