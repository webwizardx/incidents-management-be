import { Action } from 'src/permissions/enum';
import { IPolicyHandler } from 'src/permissions/handlers/policies.handler';
import { AppAbility } from 'src/permissions/permissions-ability.factory/permissions-ability.factory';
import { User } from '../models/user.model';

export class CreateUserPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, User.tableName);
  }
}

export class ReadUserPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, User.tableName);
  }
}

export class UpdateUserPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Update, User.tableName);
  }
}

export class DeleteUserPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Delete, User.tableName);
  }
}
