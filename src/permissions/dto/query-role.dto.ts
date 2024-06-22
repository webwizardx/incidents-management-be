import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginatedQueryDto } from 'src/dto/paginated-query.dto';
import { PatchRoleDto } from './patch-role.dto';

export class QueryRoleDto extends IntersectionType(
  PatchRoleDto,
  PaginatedQueryDto
) {
  @ApiPropertyOptional({
    description: 'The ID of the role',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  id: number;

  @ApiPropertyOptional({
    default: 'name',
    description: `Record field to order by`,
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  orderBy: string = 'name';
}
