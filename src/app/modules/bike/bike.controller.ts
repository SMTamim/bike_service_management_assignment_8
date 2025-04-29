import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BikeServices } from './bike.service';

const createOne = catchAsync(async (req, res) => {
  const result = await BikeServices.createOneIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike added` successfully',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const result = await BikeServices.getAllFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bikes fetched successfully',
    data: result,
  });
});

const getOne = catchAsync(async (req, res) => {
  const result = await BikeServices.getOneFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike fetched successfully',
    data: result,
  });
});

export const BikeControllers = {
  createOne,
  getAll,
  getOne,
};
