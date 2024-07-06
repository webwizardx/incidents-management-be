import {
  BadRequestException,
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
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { API_BEARER_AUTH } from 'src/constants';
import { CheckPolicies } from 'src/modules/permissions/decorators/check-policies.decorator';
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

@ApiBearerAuth(API_BEARER_AUTH)
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
  /**
   * Creates a new user.
   * @param body - The data for creating the user.
   * @returns The created user.
   * @author Jonathan Alvarado
   */
  async create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @ApiOperation({
    description: 'This endpoint is used to get a list of users',
    summary: 'Get a list of users',
  })
  @CheckPolicies(new ReadUserPolicyHandler())
  @Get()
  /**
   * Finds users based on the provided query.
   * @param query - The query parameters for finding users.
   * @returns A Promise that resolves to the found users.
   * @author Jonathan Alvarado
   */
  async find(@Query() query: QueryUserDto) {
    return this.usersService.find(query);
  }

  @ApiOperation({
    description: 'This endpoint is used to get a user by id',
    summary: 'Get a user by id',
  })
  @CheckPolicies(new ReadUserPolicyHandler())
  @Get(':id')
  /**
   * Finds a user by their ID.
   * @param id - The ID of the user.
   * @returns The user with the specified ID.
   * @throws NotFoundException if the user with the specified ID is not found.
   * @author Jonathan Alvarado
   */
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
  /**
   * Updates a user by applying partial changes specified in the request body.
   * @param id - The ID of the user to update.
   * @param body - The partial changes to apply to the user.
   * @returns The updated user.
   * @throws NotFoundException if the user with the specified ID is not found.
   * @author Jonathan Alvarado
   */
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
  /**
   * Updates a user by their ID.
   * @param id - The ID of the user to update.
   * @param body - The data to update the user with.
   * @returns The updated user.
   * @throws NotFoundException if the user with the specified ID is not found.
   * @author Jonathan Alvarado
   */
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
  /**
   * Deletes a user by ID.
   *
   * @param id - The ID of the user to delete.
   * @returns A Promise that resolves to the deleted user.
   * @throws NotFoundException if the user with the specified ID is not found.
   * @author Jonathan Alvarado
   */
  async delete(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    if (req?.user?.id === id) {
      throw new BadRequestException(`You can't delete your own user`);
    }

    const user = await this.usersService.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.usersService.delete(id);
  }
}
