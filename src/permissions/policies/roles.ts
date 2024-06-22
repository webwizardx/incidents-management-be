import { Action } from 'src/permissions/enum';
import { IPolicyHandler } from 'src/permissions/handlers/policies.handler';
import { AppAbility } from 'src/permissions/permissions-ability.factory/permissions-ability.factory';
import { Role } from '../models/role.model';

export class CreateRolePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, Role.tableName);
  }
}

export class ReadRolePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, Role.tableName);
  }
}

export class UpdateRolePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Update, Role.tableName);
  }
}

export class DeleteRolePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Delete, Role.tableName);
  }
}
