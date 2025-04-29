import { Response } from 'express';
type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T;
};

const sendResponse = <T>(res: Response, responseData: TResponse<T>) => {
  const response: Partial<TResponse<T>> = {
    success: responseData.success,
    message: responseData.message,
  };
  if (responseData.data && Object.keys(responseData.data).length > 0) {
    response.data = responseData.data;
  }
  res.status(responseData.statusCode).json(response);
};

export default sendResponse;
