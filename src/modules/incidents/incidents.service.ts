import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { PaginatedResponseDto } from 'src/dto/paginated-response.dto';
import { Incident } from 'src/modules/incidents/models/incident.model';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { PatchIncidentDto } from './dto/patch-incident.dto';
import { QueryIncidentDto } from './dto/query-incident.dto';

@Injectable()
export class IncidentsService {
  constructor(
    @InjectModel(Incident) private readonly incident: typeof Incident
  ) {}

  /**
   * Creates a new incident.
   * @param body - The incident data to be created.
   * @returns The created incident.
   * @author Jonathan Alvarado
   */
  async create(body: Omit<CreateIncidentDto, 'number'>) {
    return await this.incident.create(body);
  }

  /**
   * Deletes an incident by its ID.
   *
   * @param id - The ID of the incident to delete.
   * @returns A promise that resolves to the deleted incident.
   */
  async delete(id: number) {
    return await this.incident.destroy({ where: { id } });
  }

  /**
   * Finds incidents based on the provided query parameters.
   * @param query - The query parameters for filtering incidents.
   * @returns A paginated response containing the found incidents.
   * @author Jonathan Alvarado
   */
  async find(query: QueryIncidentDto) {
    const { limit, order, orderBy, page, ...where } = query;
    const { count: totalCount, rows: data } =
      await this.incident.findAndCountAll({
        limit,
        order: [[orderBy, order]],
        offset: (page - 1) * limit,
        where,
      });

    return new PaginatedResponseDto({
      data,
      limit,
      page,
      order,
      orderBy,
      totalCount,
    });
  }

  /**
   * Finds a single incident based on the provided query.
   * @param query - The query to filter the incidents.
   * @returns A promise that resolves to the found incident.
   * @author Jonathan Alvarado
   */
  async findOne(query: FindOptions<Incident>) {
    return await this.incident.findOne(query);
  }

  /**
   * Updates an incident with the specified ID.
   * @param id - The ID of the incident to update.
   * @param body - The data to update the incident with.
   * @returns A promise that resolves to the updated incident.
   * @author Jonathan Alvarado
   */
  async patch(id: number, body: PatchIncidentDto) {
    return await this.incident.update(body, { where: { id } });
  }

  /**
   * Updates an incident with the specified ID.
   * @param id - The ID of the incident to update.
   * @param body - The updated data for the incident, excluding the `number` field.
   * @returns A promise that resolves to the updated incident.
   * @author Jonathan Alvarado
   */
  async update(id: number, body: Omit<CreateIncidentDto, 'number'>) {
    return await this.incident.update(body, { where: { id } });
  }
}
