import {
  ApiPropertyOptional,
  IntersectionType,
  PartialType,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginatedQueryDto } from 'src/dto/paginated-query.dto';
import { CreateRoleHasPermissionDto } from './create-role-has-permission.dto';

export class QueryRoleHasPermissionDto extends IntersectionType(
  PartialType(CreateRoleHasPermissionDto),
  PaginatedQueryDto
) {
  @ApiPropertyOptional({
    description: 'The ID of the roleHasPermission',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  id: number;

  @ApiPropertyOptional({
    default: 'permissionId',
    description: `Record field to order by`,
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  orderBy: string = 'permissionId';
}
