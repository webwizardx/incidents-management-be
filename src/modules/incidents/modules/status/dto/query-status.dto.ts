import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginatedQueryDto } from 'src/dto/paginated-query.dto';
import { PatchStatusDto } from './patch-status.dto';

export class QueryStatusDto extends IntersectionType(
  PatchStatusDto,
  PaginatedQueryDto
) {
  @ApiPropertyOptional({
    description: 'The id of the status',
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
