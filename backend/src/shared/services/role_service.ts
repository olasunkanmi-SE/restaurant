import { Injectable } from '@nestjs/common';
import { Role, RoleOrder } from '../../application';
import { IRoleService } from '../interfaces/role_service.interface';

@Injectable()
export class RoleService implements IRoleService {
  sortRoles(roles: Role[]): Role[] {
    const validRoles = roles.filter((role) => role in RoleOrder);
    if (validRoles?.length) {
      validRoles.sort((a, b) => RoleOrder[a] - RoleOrder[b]);
    }
    return validRoles;
  }
}
