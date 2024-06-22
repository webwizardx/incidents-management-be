import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class CreateRoleHasPermissionDto {
  @ApiProperty({
    description: 'The ID of the permission',
    example: 1,
  })
  @IsInt()
  @Type(() => Number)
  permissionId: number;

  @ApiProperty({
    description: 'The ID of the role',
    example: 1,
  })
  @IsInt()
  @Type(() => Number)
  roleId: number;
}
