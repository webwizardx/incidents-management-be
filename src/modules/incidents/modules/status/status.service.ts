import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { PaginatedResponseDto } from 'src/dto/paginated-response.dto';
import { CreateStatusDto } from './dto/create-status.dto';
import { PatchStatusDto } from './dto/patch-status.dto';
import { QueryStatusDto } from './dto/query-status.dto';
import { Status } from './models/status.model';

@Injectable()
export class StatusService {
  constructor(@InjectModel(Status) private readonly status: typeof Status) {}

  /**
   * Creates a new status.
   * @param body - The data for creating the status.
   * @returns A promise that resolves to the created status.
   * @author Jonathan Alvarado
   */
  async create(body: Omit<CreateStatusDto, 'number'>) {
    return await this.status.create(body);
  }

  /**
   * Deletes a status record by its ID.
   * @param id - The ID of the status record to delete.
   * @returns A promise that resolves to the number of affected rows.
   * @author Jonathan Alvarado
   */
  async delete(id: number) {
    return await this.status.destroy({ where: { id } });
  }

  /**
   * Finds status based on the provided query parameters.
   * @param query - The query parameters for filtering status.
   * @returns A paginated response containing the filtered status.
   * @author Jonathan Alvarado
   */
  async find(query: QueryStatusDto) {
    const { limit, order, orderBy, page, ...where } = query;
    const { count: totalCount, rows: data } = await this.status.findAndCountAll(
      {
        limit,
        order: [[orderBy, order]],
        offset: (page - 1) * limit,
        where,
      }
    );

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
   * Finds a single status record based on the provided query options.
   * @param query - The query options to filter the status record.
   * @returns A promise that resolves to the found status record.
   * @author Jonathan Alvarado
   */
  async findOne(query: FindOptions<Status>) {
    return await this.status.findOne(query);
  }

  /**
   * Updates the status of an incident.
   * @param id - The ID of the incident.
   * @param body - The data to update the status.
   * @returns A promise that resolves to the updated status.
   * @author Jonathan Alvarado
   */
  async patch(id: number, body: PatchStatusDto) {
    return await this.status.update(body, { where: { id } });
  }

  /**
   * Updates a status record in the database.
   *
   * @param id - The ID of the status record to update.
   * @param body - The updated status data.
   * @returns A promise that resolves to the updated status record.
   * @author Jonathan Alvarado
   */
  async update(id: number, body: Omit<CreateStatusDto, 'number'>) {
    return await this.status.update(body, { where: { id } });
  }
}
