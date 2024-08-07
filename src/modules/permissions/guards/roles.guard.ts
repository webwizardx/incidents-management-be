import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/modules/permissions/decorators/role.decorator';
import { Role } from 'src/modules/permissions/enum/role.enum';
import { User } from 'src/modules/users/models/user.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /**
   * Determines if the user has the required roles to access the resource.
   * @param context - The execution context of the request.
   * @returns A boolean indicating whether the user has the required roles.
   * @author Jonathan Alvarado
   */
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles?.length) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    return requiredRoles.some((role) => (user as User)?.role?.name === role);
  }
}
