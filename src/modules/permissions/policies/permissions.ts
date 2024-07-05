import { Action } from 'src/modules/permissions/enum';
import { IPolicyHandler } from 'src/modules/permissions/handlers/policies.handler';
import { AppAbility } from 'src/modules/permissions/permissions-ability.factory/permissions-ability.factory';
import { Permission } from '../models/permission.model';

export class CreatePermissionPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, Permission.tableName);
  }
}

export class ReadPermissionPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, Permission.tableName);
  }
}

export class UpdatePermissionPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Update, Permission.tableName);
  }
}

export class DeletePermissionPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Delete, Permission.tableName);
  }
}
