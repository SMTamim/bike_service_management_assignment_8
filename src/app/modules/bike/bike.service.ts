import { Bike, PrismaClient } from '@prisma/client';
import NotFoundError from '../../error/NotFoundError';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';

const prisma = new PrismaClient();

const createOneIntoDB = async (payload: Bike): Promise<Bike> => {
  const { brand, model, year, customerId } = payload;
  const result = await prisma.bike.create({
    data: { brand, model, year, customerId },
  });
  return result;
};

const getAllFromDB = async (): Promise<Bike[]> => {
  const result = await prisma.bike.findMany();
  return result;
};

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
