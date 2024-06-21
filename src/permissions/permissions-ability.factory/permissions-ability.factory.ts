import {
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
  PureAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/models/user.model';
import { Action } from '../enum';

type Subjects = InferSubjects<typeof User> | string;

export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class PermissionsAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder<PureAbility<[Action, Subjects]>>(
      PureAbility as AbilityClass<AppAbility>
    );

    const permissions = user?.role?.permissions || [];

    for (const permission of permissions) {
      can(permission.action as Action, permission.subject);
    }

    return build({
      // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
