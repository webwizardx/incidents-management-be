import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsISO8601, IsOptional, IsString } from 'class-validator';

export class CreateIncidentDto {
  @ApiPropertyOptional({
    description: 'The user id of the user who is assigned to the incident',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  assignedTo?: number;

  @ApiProperty({
    description: 'The category id of the incident',
    example: 1,
  })
  @IsInt()
  @Type(() => Number)
  categoryId: number;

  @ApiPropertyOptional({
    description: 'The date the incident was closed',
    example: '2021-01-01T00:00:00',
  })
  @IsISO8601()
  @IsOptional()
  closedAt?: Date;

  @ApiProperty({
    description: 'The id of the user who created the incident',
    example: 1,
  })
  @IsInt()
  @Type(() => Number)
  ownerId: number;

  @ApiProperty({
    description: 'The id of the status of the incident',
    example: 1,
  })
  @IsInt()
  @Type(() => Number)
  statusId: number;

  @ApiProperty({
    description: 'The title of the incident',
    example: 'Incident 1',
  })
  @IsString()
  title: string;
}
