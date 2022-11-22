export interface IResult<T> {
  isSuccess: true;
  data: T;
  error: string;
}
