export interface ILocation {
  readonly address: string;
  readonly address_2?: string;
  readonly city: string;
  readonly country: string;
  readonly postal_code: string;
  readonly state: string;
  readonly latitude?: number;
  readonly longitude?: number;
}
