import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CustomerServices } from './customer.service';

const createOne = catchAsync(async (req, res) => {
  const result = await CustomerServices.createOneIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Customer created successfully',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const result = await CustomerServices.getAllFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customers fetched successfully',
    data: result,
  });
});

const getOne = catchAsync(async (req, res) => {
  const result = await CustomerServices.getOneFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer fetched successfully',
    data: result,
  });
});

const updateOne = catchAsync(async (req, res) => {
  const result = await CustomerServices.updateOneIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer updated successfully',
    data: result,
  });
});

const deleteOne = catchAsync(async (req, res) => {
  const result = await CustomerServices.deleteOneFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer deleted successfully',
    data: result,
  });
});

export const CustomerControllers = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
