export interface ILocation {
  readonly address: string;
  readonly address2?: string;
  readonly city: string;
  readonly country: string;
  readonly postalCode: string;
  readonly state: string;
  readonly latitude?: number;
  readonly longitude?: number;
}
