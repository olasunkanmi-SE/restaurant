import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_KEY, Role, TYPES } from 'src/application';
import { IAccessControlService } from 'src/shared/interfaces/access_control_service.interface';
import { Context, IContextService } from '../context';

@Injectable()
export class RoleGuard implements CanActivate {
  private context: Context;
  constructor(
    private readonly reflector: Reflector,
    @Inject(TYPES.IAccessControlService) private readonly accessControlService: IAccessControlService,
    @Inject(TYPES.IContextService)
    private readonly contextService: IContextService,
  ) {
    this.context = this.contextService.getContext();
  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    for (const role of requiredRoles) {
      const isAuthorized = this.accessControlService.isAuthorized({
        currentRole: this.context.role as Role,
        requiredRole: role,
      });
      if (isAuthorized) {
        return true;
      }
    }
    return false;
  }
}
