import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CustomerControllers } from './customer.controller';
import { CustomerValidations } from './customer.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(CustomerValidations.createCustomerSchema),
  CustomerControllers.createOne
);

router.get('/', CustomerControllers.getAll);
router.get('/:id', CustomerControllers.getOne);

router.put(
  '/:id',
  validateRequest(CustomerValidations.updateCustomerSchema),
  CustomerControllers.updateOne
);

router.delete('/:id', CustomerControllers.deleteOne);

export const CustomerRoutes = router;
