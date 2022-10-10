export interface IExceptionResponse {
  statusCode: number;
  timeStamp: string;
  path: string;
  message: string;
  method: string;
}

export interface IRequestException {
  statusCode: number;
  message: string;
}
