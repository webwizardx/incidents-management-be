import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginatedQueryDto } from 'src/dto/paginated-query.dto';
import paramToArray from 'src/transforms/param-to-array.dto';
import { PatchIncidentDto } from './patch-incident.dto';

export class QueryIncidentDto extends IntersectionType(
  PatchIncidentDto,
  PaginatedQueryDto
) {
  @ApiPropertyOptional({
    description: 'The relations to include',
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @Transform(paramToArray)
  include?: string[] = [];

  @ApiPropertyOptional({
    description: 'The id of the incident',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  id: number;

  @ApiPropertyOptional({
    default: 'title',
    description: `Record field to order by`,
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  orderBy: string = 'title';
}
