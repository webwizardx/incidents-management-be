import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The content of the comment',
    example: 'This is a comment',
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'The id of the incident the comment is related to',
    example: 1,
  })
  @IsInt()
  @Type(() => Number)
  incidentId: number;

  @ApiPropertyOptional({
    description: 'The url of the image attached to the comment',
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    description: 'The id of the user who created the comment',
    example: 1,
  })
  @IsInt()
  @Type(() => Number)
  userId: number;
}
