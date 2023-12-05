import { Role } from '../../application';

export interface IRoleService {
  sortRoles(roles: Role[]): Role[];
}
