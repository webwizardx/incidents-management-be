import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Order } from 'src/enum/order-by.enum';

export class PaginatedQueryDto {
  @ApiPropertyOptional({
    default: 25,
    description: `Number of records to return`,
    minItems: 1,
    maxItems: 2000,
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(2000)
  @Type(() => Number)
  limit: number = 25;

  @ApiPropertyOptional({
    default: Order.DESC,
    description: `Sort order. Desc/Newest/Lower = DESC, Asc/Oldest/Higher = ASC`,
    enum: Order,
    type: Order,
  })
  @IsEnum(Order)
  @IsOptional()
  order: Order = Order.DESC;

  @ApiPropertyOptional({
    default: 'createdAt',
    description: `Record field to order by`,
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  orderBy: string = 'createdAt';

  @ApiPropertyOptional({
    default: 1,
    description: `Current page of records`,
    minimum: 1,
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  page: number = 1;
}
