export interface ILogger {
  log(msg: any): void;
  error(msg: any): void;
  warn(msg: any): void;
}
