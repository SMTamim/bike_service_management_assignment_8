import { z } from 'zod';

const createServiceRecordSchema = z.object({
  body: z.object({
    bikeId: z
      .string({ required_error: 'Bike ID is required' })
      .uuid({ message: 'Invalid UUID format' }),
    serviceDate: z
      .string({ required_error: 'Service date is required' })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
      }),
    description: z
      .string({ required_error: 'Description is required' })
      .min(1, { message: 'Description cannot be empty' }),
    status: z.enum(['pending', 'in-progress', 'done']),
  }),
});

export const ServiceRecordValidations = {
  createServiceRecordSchema,
};
