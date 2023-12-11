export const APIResponseMessage = {
  serverError: 'Critical server error occured, please try again later',
  emailHeaderError: 'user email is required',
  correlationIdHeaderError: 'correlationId is required',
  invalidEmailHeaderError: 'Invalid user email address',
  invalidCorrelationId: 'Invalid correlationId',
  emailHeader: 'x-user-email',
  correlationIdHeader: 'x-correlation-id',
  authorizationHeader: 'authorization',
  roleHeader: 'x-user-role',
};

export const saltRounds = 10;

export enum SingleClientStatus {
  onBoarding = 'onBoarding',
  boarded = 'boarded',
  banned = 'banned',
}

export const tokenExpiresIn = 3600000;

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'CLIENT',
}

export const RoleOrder: Record<Role, number> = {
  [Role.GUEST]: 1,
  [Role.USER]: 2,
  [Role.ADMIN]: 3,
};

export const ROLE_KEY = 'role';
