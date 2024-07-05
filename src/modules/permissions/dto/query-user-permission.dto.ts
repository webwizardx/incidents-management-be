import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class QueryUserPermissionDto {
  @ApiPropertyOptional({
    description: 'The ID of the user',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  id?: number;
}
