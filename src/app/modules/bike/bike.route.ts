import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BikeControllers } from './bike.controller';
import { BikeValidations } from './bike.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(BikeValidations.createBikeSchema),
  BikeControllers.createOne,
);

router.get('/', BikeControllers.getAll);
router.get('/:id', BikeControllers.getOne);

export const BikeRoutes = router;
