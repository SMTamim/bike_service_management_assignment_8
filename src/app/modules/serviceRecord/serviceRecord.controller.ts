import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ServiceRecordServices } from './serviceRecord.service';

const createOne = catchAsync(async (req, res) => {
  const result = await ServiceRecordServices.createOneIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Service record created successfully',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const result = await ServiceRecordServices.getAllFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service records fetched successfully',
    data: result,
  });
});

const getPendingOrOverdueServices = catchAsync(async (_, res) => {
  const result =
    await ServiceRecordServices.getPendingOrOverdueServicesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Overdue or pending services fetched successfully',
    data: result,
  });
});

const getOne = catchAsync(async (req, res) => {
  const result = await ServiceRecordServices.getOneFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service record fetched successfully',
    data: result,
  });
});

const completeServiceRecord = catchAsync(async (req, res) => {
  const result = await ServiceRecordServices.completeServiceRecordIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service marked as completed',
    data: result,
  });
});

export const ServiceControllers = {
  createOne,
  getAll,
  getOne,
  completeServiceRecord,
  getPendingOrOverdueServices,
};
