import { Action } from 'src/modules/permissions/enum';
import { IPolicyHandler } from 'src/modules/permissions/handlers/policies.handler';
import { AppAbility } from 'src/modules/permissions/permissions-ability.factory/permissions-ability.factory';
import { RoleHasPermission } from '../models/role-has-permission.model';

export class CreateRoleHasPermissionPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, RoleHasPermission.tableName);
  }
}

export class ReadRoleHasPermissionPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, RoleHasPermission.tableName);
  }
}

export class UpdateRoleHasPermissionPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Update, RoleHasPermission.tableName);
  }
}

export class DeleteRoleHasPermissionPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Delete, RoleHasPermission.tableName);
  }
}
