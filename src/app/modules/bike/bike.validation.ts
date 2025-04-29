import { z } from 'zod';

const createBikeSchema = z.object({
  body: z.object({
    brand: z.string({ required_error: 'Brand is required!' }),
    model: z.string({ required_error: 'Model is required!' }),
    year: z
      .number({ required_error: 'Year is required!' })
      .int()
      .min(1000, { message: 'Please enter a valid year' })
      .max(9999, { message: 'Please enter a valid year' }),
    customerId: z.string({ required_error: 'Customer Id is required!' }),
  }),
});

export const BikeValidations = {
  createBikeSchema,
};
