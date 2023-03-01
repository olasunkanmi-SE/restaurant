export interface ITemModel {
  readonly name: string;
  readonly description?: string;
  readonly price: number;
  readonly quantity: number;
  readonly maximumPermitted: number;
}
