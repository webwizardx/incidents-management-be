import { Action } from 'src/modules/permissions/enum';
import { IPolicyHandler } from 'src/modules/permissions/handlers/policies.handler';
import { AppAbility } from 'src/modules/permissions/permissions-ability.factory/permissions-ability.factory';
import { Comment } from '../models/comment.model';

export class CreateCommentPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, Comment.tableName);
  }
}

export class ReadCommentPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, Comment.tableName);
  }
}

export class UpdateCommentPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Update, Comment.tableName);
  }
}

export class DeleteCommentPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Delete, Comment.tableName);
  }
}
