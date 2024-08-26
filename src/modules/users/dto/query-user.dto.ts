import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginatedQueryDto } from 'src/dto/paginated-query.dto';
import paramToArray from 'src/transforms/param-to-array.dto';
import { PatchUserDto } from './patch-user.dto';

export class QueryUserDto extends IntersectionType(
  PatchUserDto,
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
    description: 'The ID of the user',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  id: number;

  @ApiPropertyOptional({
    description: 'Whether to include pagination data',
    example: true,
    type: Boolean,
  })
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  pagination = true;
}
