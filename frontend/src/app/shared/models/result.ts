export interface IResult {
  isSuccess: boolean;
  statusCode: number;
  message: any;
  path: string;
  timeStamp: string;
  method: string;
  data: { [key: string]: any };
}
