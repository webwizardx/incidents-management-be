import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginatedQueryDto } from 'src/dto/paginated-query.dto';
import { PatchPermissionDto } from './patch-permission.dto';

export class QueryPermissionDto extends IntersectionType(
  PatchPermissionDto,
  PaginatedQueryDto
) {
  @ApiPropertyOptional({
    description: 'The ID of the permission',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  id: number;

  @ApiPropertyOptional({
    default: 'action',
    description: `Record field to order by`,
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  orderBy: string = 'action';
}
