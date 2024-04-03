import { Client, Department, Employee, Location } from '@prisma/client';

export type SafeEmployee = Employee & {
  department: Department | null;
  location: Location | null;
  clients: Client[] | [];
};

export type SafeClient = Client & {
  employee: Employee | null;
};
