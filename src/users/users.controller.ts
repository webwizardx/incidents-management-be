import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CheckPolicies } from 'src/permissions/decorators/check-policies.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import {
  CreateUserPolicyHandler,
  DeleteUserPolicyHandler,
  ReadUserPolicyHandler,
  UpdateUserPolicyHandler,
} from './policies';
import { UsersService } from './users.service';

@ApiBearerAuth('BearerJWT')
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    description: 'This endpoint is used to create a user',
    summary: 'Create a user',
  })
  @CheckPolicies(new CreateUserPolicyHandler())
  @Post()
  async create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @ApiOperation({
    description: 'This endpoint is used to get a list of users',
    summary: 'Get a list of users',
  })
  @CheckPolicies(new ReadUserPolicyHandler())
  @Get()
  async find(@Query() query: QueryUserDto) {
    return this.usersService.find(query);
  }

  @ApiOperation({
    description: 'This endpoint is used to get a user by id',
    summary: 'Get a user by id',
  })
  @CheckPolicies(new ReadUserPolicyHandler())
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  @ApiOperation({
    description: 'This endpoint is used to partially update a user',
    summary: 'Partially update a user',
  })
  @CheckPolicies(new UpdateUserPolicyHandler())
  @Patch(':id')
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PatchUserDto
  ) {
    const user = await this.usersService.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.usersService.patch(id, body);
  }

  @ApiOperation({
    description: 'This endpoint is used to update a user',
    summary: 'Update a user',
  })
  @CheckPolicies(new UpdateUserPolicyHandler())
  @Put(':id')
  async put(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateUserDto
  ) {
    const user = await this.usersService.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.usersService.update(id, body);
  }

  @ApiOperation({
    description: 'This endpoint is used to delete a user',
    summary: 'Delete a user',
  })
  @CheckPolicies(new DeleteUserPolicyHandler())
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.usersService.delete(id);
  }
}
