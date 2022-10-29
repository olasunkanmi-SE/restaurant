export interface IMerchantData {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly organisationName: string;
  readonly phoneNumber: string;
  readonly passwordHash: string;
  readonly role: string;
  readonly isActive: boolean;
  readonly status: string;
  readonly organisationAddress: string;
  readonly refreshTokenHash: string;
}
