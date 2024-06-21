import { ApiResponseProperty } from '@nestjs/swagger';
import { Order } from 'src/enum/order-by.enum';

export class PaginatedResponseDto<T> {
  @ApiResponseProperty()
  data: T[];

  @ApiResponseProperty({
    example: 25,
  })
  limit: number;

  @ApiResponseProperty({
    example: 1,
  })
  page: number;

  @ApiResponseProperty({
    enum: [Order.ASC, Order.DESC],
    example: Order.DESC,
    type: Order,
  })
  order: Order;

  @ApiResponseProperty({
    example: 'createdAt',
  })
  orderBy: string;

  @ApiResponseProperty({ example: 1 })
  totalCount?: number;

  constructor(args?: PaginatedResponseDto<T>) {
    Object.assign(this, args);
  }
}
