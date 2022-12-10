export interface IResult {
  isSuccess: boolean;
  statusCode: number;
  message: {
    statusCode: number;
    message: string;
  };
  path: string;
  timeStamp: string;
  method: string;
  data: { [key: string]: any };
}
