import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { PaginatedQueryDto } from 'src/dto/paginated-query.dto';
import { PatchUserDto } from './patch-user.dto';

export class QueryUserDto extends IntersectionType(
  PatchUserDto,
  PaginatedQueryDto
) {
  @ApiPropertyOptional({
    description: 'The ID of the user',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  id: number;
}
