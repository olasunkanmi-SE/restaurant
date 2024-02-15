import { Inject, Injectable } from '@nestjs/common';
import { Role, TYPES } from 'src/application';
import { IAccessControlService } from '../interfaces/access_control_service.interface';
import { IRoleService } from '../interfaces/role_service.interface';
import { IIsAuthorizedProps } from '../interfaces/shared.interface';

@Injectable()
export class AccessControlService implements IAccessControlService {
  private hierarchies: Map<string, number>[] = [];
  private priority = 1;

  constructor(@Inject(TYPES.IRoleService) private readonly roleService: IRoleService) {
    this.mapRoleToPriority();
  }

  private mapRoleToPriority(): Map<string, number> {
    const sortedRoles = this.roleService.sortRoles(Object.values(Role));
    if (sortedRoles?.length) {
      const rolesPriorityMap = sortedRoles.reduce((map, role) => {
        map.set(role, this.priority);
        this.priority++;
        this.hierarchies.push(map);
        return map;
      }, new Map<string, number>());
      return rolesPriorityMap;
    }
  }

  public isAuthorized({ currentRole, requiredRole }: IIsAuthorizedProps): boolean {
    let isAuthorized = false;
    for (const hierarchy of this.hierarchies) {
      const priority = hierarchy.get(currentRole);
      const requirePriority = hierarchy.get(requiredRole);
      if (priority && requirePriority) {
        if (priority >= requirePriority) {
          isAuthorized = true;
        }
        if (priority === requirePriority) {
          isAuthorized = true;
        }
      }
    }
    return isAuthorized;
  }
}
