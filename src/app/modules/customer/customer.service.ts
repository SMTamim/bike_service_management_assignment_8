import { Customer, PrismaClient } from '@prisma/client';
import NotFoundError from '../../error/NotFoundError';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';

const prisma = new PrismaClient();

/**
 * Creates a customer in the database. If the email already exists, a 409 CONFLICT will be thrown.
 * @param {Customer} payload The customer to create
 * @returns {Promise<Customer>} The newly created customer
 * @throws {AppError} If the customer already exists
 */
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

/**
 * Fetches all customers from the database.
 *
 * @returns An array of customer objects.
 */

const getAllFromDB = async (): Promise<Customer[]> => {
  const result = await prisma.customer.findMany();
  return result;
};

/**
 * Fetches a single customer from the database by their ID.
 *
 * @param customerId - The ID of the customer to be fetched.
 *
 * @throws {NotFoundError} If the customer with the provided ID does not exist.
 *
 * @returns The customer object if found, or null if not found.
 */

const getOneFromDB = async (customerId: string): Promise<Customer | null> => {
  const result = await prisma.customer.findFirst({
    where: { customerId },
  });
  if (!result)
    throw new NotFoundError(`Customer with the provided id: '${customerId}'`);
  return result;
};

/**
 * Updates a customer in the database with the provided fields.
 *
 * @param customerId - The ID of the customer to be updated.
 * @param payload - An object containing the fields to be updated,
 *                  with at least one of the following properties:
 *                  - `name`: The new name of the customer.
 *                  - `phone`: The new phone number of the customer.
 *
 * @throws {NotFoundError} If the customer with the provided ID does not exist.
 *
 * @returns The updated customer object, or null if not found.
 */
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

/**
 * Deletes a customer from the database by their ID.
 *
 * @param customerId - The ID of the customer to be deleted.
 *
 * @throws {NotFoundError} If the customer with the provided ID does not exist.
 *
 * @returns The deleted customer object, or null if not found.
 */
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
