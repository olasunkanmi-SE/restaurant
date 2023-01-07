export const APIResponseMessage = {
  serverError: 'Critical server error occured, please try again later',
  emailHeaderError: 'user email is required',
  correlationIdHeaderError: 'correlationId is required',
  invalidEmailHeaderError: 'Invalid user email address',
  emailHeader: 'x-user-email',
  correlationIdHeader: 'x-correlation-id',
  authorizationHeader: 'authorization',
  roleHeader: 'x-user-role',
};

export const saltRounds = 10;

export enum MerchantStatus {
  onBoarding = 'onBoarding',
  boarded = 'boarded',
  banned = 'banned',
}

export const tokenExpiresIn = 3600000;
