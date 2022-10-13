export interface IExceptionResponse {
  statusCode: number;
  timeStamp: string;
  path: string;
  message: string;
  method: string;
  body?: any;
}

export interface IRequestException {
  statusCode: number;
  message: string;
}
