import { Customer, PrismaClient } from '@prisma/client';
import NotFoundError from '../../error/NotFoundError';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';

const prisma = new PrismaClient();

const createOneIntoDB = async (payload: Customer): Promise<Customer> => {
  try {
    const result = await prisma.customer.create({
      data: {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
      },
    });
    return result;
  } catch (e) {
    throw new AppError(httpStatus.CONFLICT, 'Email already exists');
  }
};

const getAllFromDB = async (): Promise<Customer[]> => {
  const result = await prisma.customer.findMany();
  return result;
};

const getOneFromDB = async (customerId: string): Promise<Customer | null> => {
  const result = await prisma.customer.findFirst({
    where: { customerId },
  });
  if (!result)
    throw new NotFoundError(`Customer with the provided id: '${customerId}'`);
  return result;
};

const updateOneIntoDB = async (
  customerId: string,
  payload: Partial<Pick<Customer, 'name' | 'phone'>>
): Promise<Customer | null> => {
  if (
    !(await prisma.customer.findFirst({
      where: { customerId },
    }))
  ) {
    throw new NotFoundError(`Customer with the provided id: '${customerId}'`);
  }
  const result = await prisma.customer.update({
    where: { customerId },
    data: {
      ...payload,
    },
  });
  return result;
};

const deleteOneFromDB = async (
  customerId: string
): Promise<Customer | null> => {
  if (
    !(await prisma.customer.findFirst({
      where: { customerId },
    }))
  ) {
    throw new NotFoundError(`Customer with the provided id: '${customerId}'`);
  }
  const result = await prisma.customer.delete({
    where: { customerId },
  });
  return result;
};

export const CustomerServices = {
  createOneIntoDB,
  getAllFromDB,
  getOneFromDB,
  updateOneIntoDB,
  deleteOneFromDB,
};
