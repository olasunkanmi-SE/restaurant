export interface ILocation {
  readonly address: string;
  readonly address2?: string;
  readonly city: string;
  readonly country: string;
  readonly postCode: string;
  readonly state: string;
  readonly latitude?: string;
  readonly longitude?: string;
}
