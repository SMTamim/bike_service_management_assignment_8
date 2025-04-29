import { z } from 'zod';

const createCustomerSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required!' }),
    email: z.string({ required_error: 'Email is required!' }),
    phone: z.string({ required_error: 'Phone is required!' }),
  }),
});

const updateCustomerSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required!' }).optional(),
    phone: z.string({ required_error: 'Phone is required!' }).optional(),
  }),
});

export const CustomerValidations = {
  createCustomerSchema,
  updateCustomerSchema,
};
