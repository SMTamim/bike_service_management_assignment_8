import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceControllers } from './serviceRecord.controller';
import { ServiceRecordValidations } from './serviceRecord.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(ServiceRecordValidations.createServiceRecordSchema),
  ServiceControllers.createOne
);

router.get('/', ServiceControllers.getAll);
router.get('/status', ServiceControllers.getPendingOrOverdueServices);
router.get('/:id', ServiceControllers.getOne);
router.put('/:id/complete', ServiceControllers.completeServiceRecord);

export const ServiceRecordRoutes = router;
