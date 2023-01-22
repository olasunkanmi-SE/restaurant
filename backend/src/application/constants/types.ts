export const TYPES = {
  IApplicationLogger: Symbol('IApplicationLogger'),
  ILocationService: Symbol('ILocationService'),
  IRestaurantService: Symbol('IRestaurantService'),
  IMerchantService: Symbol('IMerchantService'),
  IRestaurantRepository: Symbol('IRestaurantRepository'),
  IItemService: Symbol('IItemService'),
  IMenuService: Symbol('IMenuService'),
  IAddonService: Symbol('IAddonService'),
  jwtAccessTokenSecret: 'JWT_ACCESS_TOKEN_SECRET',
  AccessTokenExpiresIn: 'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
  jwtRefreshTokenSecret: 'JWT_REFRESH_TOKEN_SECRET',
  refreshTokenExpiresIn: 'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
  IAuthService: Symbol('AuthService'),
  IContextService: Symbol('IContextService'),
  IValidateUser: Symbol('IValidateUser'),
  IMapper: Symbol('IMapper'),
};
