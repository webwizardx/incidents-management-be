import { IntersectionType } from '@nestjs/swagger';
import { PaginatedQueryDto } from 'src/dto/paginated-query.dto';
import { PatchUserDto } from './patch-user.dto';

export class QueryUserDto extends IntersectionType(
  PatchUserDto,
  PaginatedQueryDto
) {}
