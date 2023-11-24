import { Department, Employee, Location, Settlement } from '@prisma/client';

export type SafeEmployee = Employee & {
  department: Department | null;
  location: Location | null;
  settlements: Settlement[] | [];
};

export type SafeSettlement = Settlement & {
  employee: Employee | null;
};
