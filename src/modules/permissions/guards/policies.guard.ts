import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_POLICIES_KEY } from '../decorators/check-policies.decorator';
import { PolicyHandler } from '../handlers/policies.handler';
import {
  AppAbility,
  PermissionsAbilityFactory,
} from '../permissions-ability.factory/permissions-ability.factory';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionsAbilityFactory: PermissionsAbilityFactory
  ) {}

  /**
   * Determines if the user is authorized to access the requested resource based on the defined policies.
   * @param context - The execution context of the request.
   * @returns A promise that resolves to a boolean indicating whether the user is authorized.
   * @author Jonathan Alvarado
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler()
      ) || [];

    if (!policyHandlers?.length) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const ability = this.permissionsAbilityFactory.createForUser(user);
    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability)
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
