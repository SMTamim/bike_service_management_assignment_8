import { Bike, PrismaClient } from '@prisma/client';
import NotFoundError from '../../error/NotFoundError';

const prisma = new PrismaClient();

/**
 * Creates a new bike in the database with the provided fields.
 *
 * @param payload - The bike to be created, containing the brand, model,
 *                  year, and customer ID.
 *
 * @returns The newly created bike.
 */
const createOneIntoDB = async (payload: Bike): Promise<Bike> => {
  const { brand, model, year, customerId } = payload;

  if (!(await prisma.customer.findFirst({ where: { customerId } }))) {
    throw new NotFoundError(`Customer with id: ${customerId}`);
  }
  const result = await prisma.bike.create({
    data: { brand, model, year, customerId },
  });
  return result;
};

/**
 * Fetches all bikes from the database.
 *
 * @returns An array of bike objects.
 */
const getAllFromDB = async (): Promise<Bike[]> => {
  const result = await prisma.bike.findMany();
  return result;
};

/**
 * Fetches a single bike from the database by its ID.
 *
 * @param bikeId - The ID of the bike to be fetched.
 *
 * @throws {NotFoundError} If the bike with the provided ID does not exist.
 *
 * @returns The bike object, or null if not found.
 */
const getOneFromDB = async (bikeId: string): Promise<Bike | null> => {
  const result = await prisma.bike.findFirst({
    where: { bikeId },
  });
  if (!result)
    throw new NotFoundError(`Bike with the provided id: '${bikeId}'`);
  return result;
};

export const BikeServices = {
  createOneIntoDB,
  getAllFromDB,
  getOneFromDB,
};
