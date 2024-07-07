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
import { API_BEARER_AUTH } from 'src/constants';
import { CheckPolicies } from '../permissions/decorators/check-policies.decorator';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { PatchIncidentDto } from './dto/patch-incident.dto';
import { QueryIncidentDto } from './dto/query-incident.dto';
import { IncidentsService } from './incidents.service';
import {
  CreateIncidentPolicyHandler,
  DeleteIncidentPolicyHandler,
  ReadIncidentPolicyHandler,
  UpdateIncidentPolicyHandler,
} from './policies';

@ApiBearerAuth(API_BEARER_AUTH)
@ApiTags('Incidents')
@Controller('incidents')
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @ApiOperation({
    description: 'This endpoint is used to create an incident',
    summary: 'Create an incident',
  })
  @CheckPolicies(new CreateIncidentPolicyHandler())
  @Post()
  /**
   * Creates a new incident.
   * @param body - The data for creating the incident.
   * @returns The created incident.
   * @author Jonathan Alvarado
   */
  async create(@Body() body: CreateIncidentDto) {
    return this.incidentsService.create(body);
  }

  @ApiOperation({
    description: 'This endpoint is used to get incidents',
    summary: 'Get incidents',
  })
  @CheckPolicies(new ReadIncidentPolicyHandler())
  @Get()
  /**
   * Finds incidents based on the provided query parameters.
   * @param query - The query parameters for filtering incidents.
   * @returns A promise that resolves to the found incidents.
   * @author Jonathan Alvarado
   */
  async find(@Query() query: QueryIncidentDto) {
    return this.incidentsService.find(query);
  }

  @ApiOperation({
    description: 'This endpoint is used to get an incident by id',
    summary: 'Get an incident by id',
  })
  @CheckPolicies(new ReadIncidentPolicyHandler())
  @Get(':id')
  /**
   * Finds an incident by its ID.
   * @param id - The ID of the incident.
   * @returns The found incident.
   * @throws NotFoundException if the incident with the specified ID is not found.
   * @author Jonathan Alvarado
   */
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const incident = await this.incidentsService.findOne({ where: { id } });

    if (!incident) {
      throw new NotFoundException(`Incident with id ${id} not found`);
    }

    return incident;
  }

  @ApiOperation({
    description: 'This endpoint is used to update an incident',
    summary: 'Update an incident',
  })
  @CheckPolicies(new UpdateIncidentPolicyHandler())
  @Patch(':id')
  /**
   * Updates an incident by applying the changes specified in the request body.
   * @param id - The ID of the incident to update.
   * @param body - The data containing the changes to apply to the incident.
   * @returns The updated incident.
   * @throws NotFoundException if the incident with the specified ID is not found.
   * @author Jonathan Alvarado
   */
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PatchIncidentDto
  ) {
    const incident = await this.incidentsService.findOne({ where: { id } });

    if (!incident) {
      throw new NotFoundException(`Incident with id ${id} not found`);
    }

    return this.incidentsService.patch(id, body);
  }

  @ApiOperation({
    description: 'This endpoint is used to update an incident',
    summary: 'Update an incident',
  })
  @CheckPolicies(new UpdateIncidentPolicyHandler())
  @Put(':id')
  /**
   * Updates an incident with the specified ID.
   *
   * @param id - The ID of the incident to update.
   * @param body - The data to update the incident with.
   * @returns The updated incident.
   * @throws NotFoundException if the incident with the specified ID is not found.
   * @author Jonathan Alvarado
   */
  async put(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateIncidentDto
  ) {
    const incident = await this.incidentsService.findOne({ where: { id } });

    if (!incident) {
      throw new NotFoundException(`Incident with id ${id} not found`);
    }

    return this.incidentsService.update(id, body);
  }

  @ApiOperation({
    description: 'This endpoint is used to delete an incident',
    summary: 'Delete an incident',
  })
  @CheckPolicies(new DeleteIncidentPolicyHandler())
  @Delete(':id')
  /**
   * Deletes an incident by its ID.
   *
   * @param id - The ID of the incident to delete.
   * @returns A Promise that resolves to the deleted incident.
   * @throws NotFoundException if the incident with the specified ID is not found.
   * @author Jonathan Alvarado
   */
  async delete(@Param('id', ParseIntPipe) id: number) {
    const incident = await this.incidentsService.findOne({ where: { id } });

    if (!incident) {
      throw new NotFoundException(`Incident with id ${id} not found`);
    }

    return this.incidentsService.delete(id);
  }
}
