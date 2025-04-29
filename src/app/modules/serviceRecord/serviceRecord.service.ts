import { ServiceRecord, PrismaClient, ServiceStatus } from '@prisma/client';
import NotFoundError from '../../error/NotFoundError';
import { statusLabelMap } from '../../utils/serviceStatus';

const prisma = new PrismaClient();

/**
 * Creates a new service record in the database.
 *
 * @param payload - The service record to be created, containing the bike ID,
 *                  service date, description, and status.
 *
 * @returns The newly created service record.
 */

const createOneIntoDB = async (
  payload: ServiceRecord,
): Promise<ServiceRecord> => {
  const { bikeId, serviceDate, description, status } = payload;
  console.log({ bikeId, serviceDate, description, status });
  const result = await prisma.serviceRecord.create({
    data: {
      bikeId,
      serviceDate,
      description,
      status,
    },
  });
  return result;
};

/**
 * Fetches all service records from the database.
 *
 * @returns An array of service records.
 */
const getAllFromDB = async (): Promise<ServiceRecord[]> => {
  const result = await prisma.serviceRecord.findMany();
  return result;
};

/**
 * Fetches all service records from the database that are either pending,
 * in progress, or overdue (i.e. service date is older than one week ago).
 *
 * @returns An array of service records.
 */
const getPendingOrOverdueServicesFromDB = async (): Promise<
  ServiceRecord[]
> => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const result = await prisma.serviceRecord.findMany({
    where: {
      AND: [
        {
          OR: [
            { status: { in: ['pending', 'in-progress'] } },
            { serviceDate: { lt: oneWeekAgo } },
          ],
        },
        {
          status: { not: 'done' },
        },
      ],
    },
  });
  return result;
};

/**
 * Fetches a single service record from the database by its ID.
 *
 * @param serviceId - The ID of the service record to be fetched.
 *
 * @throws {NotFoundError} If the service record with the provided ID does not exist.
 *
 * @returns The service record object, or null if not found.
 */
const getOneFromDB = async (
  serviceId: string,
): Promise<ServiceRecord | null> => {
  const result = await prisma.serviceRecord.findFirst({
    where: { serviceId },
  });
  if (!result)
    throw new NotFoundError(
      `Service record with the provided id: '${serviceId}'`,
    );
  return result;
};

/**
 * Updates a service record's status to DONE and completion date.
 *
 * @param serviceId - The ID of the service record to be updated.
 * @param payload - An object with the completion date to be updated.
 *                  If not provided, the current date is used.
 *
 * @throws {NotFoundError} If the service record with the provided ID does not exist.
 * @throws {Error} If the completion date is earlier than the service date.
 *
 * @returns The updated service record object, or null if not found.
 */
const completeServiceRecordIntoDB = async (
  serviceId: string,
  payload: Partial<Pick<ServiceRecord, 'completionDate'>>,
): Promise<ServiceRecord | null> => {
  const check = await prisma.serviceRecord.findFirst({
    where: { serviceId },
  });
  if (!check)
    throw new NotFoundError(
      `Service record with the provided id: '${serviceId}'`,
    );

  const completionDate = payload?.completionDate ?? new Date();

  if (completionDate < check.serviceDate) {
    throw new Error('Completion date cannot be earlier than the service date.');
  }

  const result = await prisma.serviceRecord.update({
    where: { serviceId },
    data: {
      status: statusLabelMap[ServiceStatus.DONE],
      completionDate,
    },
  });
  return result;
};

export const ServiceRecordServices = {
  createOneIntoDB,
  getAllFromDB,
  getOneFromDB,
  completeServiceRecordIntoDB,
  getPendingOrOverdueServicesFromDB,
};
