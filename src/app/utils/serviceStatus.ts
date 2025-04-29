import { ServiceStatus } from '@prisma/client';

export const statusLabelMap: Record<ServiceStatus, string> = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  DONE: 'done',
};
