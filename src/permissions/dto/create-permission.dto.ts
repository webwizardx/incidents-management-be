import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Action } from '../enum';

export class CreatePermissionDto {
  @ApiProperty({
    description: 'The action to be performed',
    example: 'create',
    enum: Action,
  })
  @IsEnum(Action)
  action: string;

  @ApiProperty({
    description: 'The subject to be acted upon',
    example: 'users',
  })
  @IsString()
  subject: string;
}
