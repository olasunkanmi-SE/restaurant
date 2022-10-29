export class Context {
  private readonly _email: string;
  private readonly _correlationId: string;
  private readonly _authToken: string;
  private readonly _role: string;
  constructor(
    email: string,
    correlationId: string,
    role?: string,
    authToken?: string,
  ) {
    this._email = email;
    this._correlationId = correlationId;
    this._authToken = authToken;
  }

  get email(): string {
    return this._email;
  }

  get correlationId(): string {
    return this._correlationId;
  }

  get authToken(): string {
    return this._authToken;
  }

  get role(): string {
    return this._role;
  }

  getCurrentContext(): this {
    return this;
  }
}
