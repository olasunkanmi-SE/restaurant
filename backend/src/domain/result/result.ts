export class Result<T> {
  isSuccess: boolean;
  private data?: any;
  message: string;
  constructor(isSuccess: boolean, data: any, message?: string) {
    this.data = data;
    this.isSuccess = isSuccess;
    this.message = message;
  }

  getvalue(): T {
    return this.data;
  }

  static ok<U>(data: U, message?: string): any {
    return new Result(true, data, message);
  }
}
