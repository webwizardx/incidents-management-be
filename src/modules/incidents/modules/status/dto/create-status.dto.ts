import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateStatusDto {
  @ApiPropertyOptional({
    description: 'The description of the status',
    example: 'This is a description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The name of the status',
    example: 'This is a name',
  })
  @IsString()
  name: string;
}
