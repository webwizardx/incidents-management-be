import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateStatusDto {
  @ApiProperty({
    description: 'The description of the status',
    example: 'This is a description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The name of the status',
    example: 'This is a name',
  })
  @IsString()
  name: string;
}
