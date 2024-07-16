import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';
import { PaginatedQueryDto } from 'src/dto/paginated-query.dto';
import paramToArray from 'src/transforms/param-to-array.dto';
import { PatchCommentDto } from './patch-comment.dto';

export class QueryCommentDto extends IntersectionType(
  PatchCommentDto,
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
    description: 'The id of the comment',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  id: number;
}
