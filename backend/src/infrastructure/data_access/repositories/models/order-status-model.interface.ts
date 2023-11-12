export interface IOrderStatusModel {
  readonly isActive: boolean;
  readonly name: string;
  readonly code: string;
  readonly description?: string;
}
