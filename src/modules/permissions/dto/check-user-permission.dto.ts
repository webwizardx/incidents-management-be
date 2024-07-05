import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Action } from '../enum';

export class CheckUserPermissionDto {
  @ApiProperty({
    description: 'The action to check',
    enum: Action,
    example: Action.Manage,
  })
  @IsEnum(Action)
  action: Action;

  @ApiProperty({
    description: 'The subject to check',
    example: 'users',
  })
  @IsNotEmpty()
  @IsString()
  subject: string;
}
