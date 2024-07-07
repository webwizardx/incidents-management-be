import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginatedQueryDto } from 'src/dto/paginated-query.dto';
import { PatchCategoryDto } from './patch-category.dto';

export class QueryCategoryDto extends IntersectionType(
  PatchCategoryDto,
  PaginatedQueryDto
) {
  @ApiPropertyOptional({
    description: 'The id of the category',
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
