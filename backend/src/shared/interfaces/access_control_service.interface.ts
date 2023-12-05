import { IIsAuthorizedProps } from './shared.interface';

export interface IAccessControlService {
  isAuthorized({ currentRole, requiredRole }: IIsAuthorizedProps): boolean;
}
