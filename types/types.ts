import { Employee } from '@prisma/client';

export type SafeEmployee = Employee & {
  department: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    companyId: string;
  } | null;
  location: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    companyId: string;
  } | null;
};
