import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { FindOptions, Op } from 'sequelize';
import { PaginatedResponseDto } from 'src/dto/paginated-response.dto';
import { Order } from 'src/enum/order-by.enum';
import { Incident } from 'src/modules/incidents/models/incident.model';
import { User } from '../users/models/user.model';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { PatchIncidentDto } from './dto/patch-incident.dto';
import { QueryIncidentDto } from './dto/query-incident.dto';
import { CommentsService } from './modules/comments/comments.service';
import { CreateCommentDto } from './modules/comments/dto/create-comment.dto';
import { STATUS } from './modules/status/enum';

@Injectable()
export class IncidentsService {
  constructor(
    private commentsService: CommentsService,
    @InjectModel(Incident) private readonly incident: typeof Incident,
    @InjectModel(User) private readonly user: typeof User
  ) {}

  /**
   * Automatically assigns an incident to the user with the lowest amount of incidents assigned to them.
   * @param id - The ID of the incident to assign.
   * @returns A promise that resolves to the assigned incident.
   */
  async autoAssignIncidentToUser(id: number) {
    let user = await this.getUserWithNoIncidentsAssigned();

    if (!user) {
      user = await this.getUserWithLowerAmountOfIncidentsAssigned();
    }

    if (!user) {
      return null;
    }

    await this.incident.update({ assigned_to: user.id }, { where: { id } });

    return await this.user.findByPk(user.id, {
      include: {
        as: 'incidentsAssigned',
        model: Incident,
      },
    });
  }

  /**
   * Creates a new incident.
   * @param body - The incident data to be created.
   * @returns The created incident.
   * @author Jonathan Alvarado
   */
  async create(body: Omit<CreateIncidentDto, 'number'>) {
    const { comment: content, ...payload } = body;
    const incident = await this.incident.create(payload);
    const commentPayload: CreateCommentDto = {
      content,
      incidentId: incident.id,
      userId: incident.ownerId,
    };
    await this.commentsService.create(commentPayload);

    await this.autoAssignIncidentToUser(incident.id);

    return incident;
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
    const { include, limit, order, orderBy, page, ...where } = query;
    const { count: totalCount, rows: data } =
      await this.incident.findAndCountAll({
        include:
          include?.[0] === 'all'
            ? {
                all: true,
                nested: true,
              }
            : include,
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

  async getIncidentsStatusCountForChart() {
    const statusCounts = await this.incident.findAll({
      attributes: [
        'statusId',
        [sequelize.fn('count', sequelize.col('status_id')), 'incidentsCount'],
      ],
      group: ['status_id'],
    });

    const statusIdMap = {
      1: STATUS.OPEN,
      2: STATUS.IN_PROGRESS,
      3: STATUS.CLOSED,
    };
    const i18n = {
      [STATUS.CLOSED]: 'Cerrado',
      [STATUS.IN_PROGRESS]: 'En Progreso',
      [STATUS.OPEN]: 'Abierto',
    };

    return statusCounts.reduce(
      (obj, result: any) => {
        const status = statusIdMap[result.statusId];
        obj[status] = {
          label: i18n[status],
          data: [
            {
              label: i18n[status],
              data: result.toJSON().incidentsCount,
            },
          ],
        };
        return obj;
      },
      {
        [STATUS.CLOSED]: {
          label: i18n[STATUS.CLOSED],
          data: [
            {
              label: i18n[STATUS.CLOSED],
              data: 1,
            },
          ],
        },
        [STATUS.IN_PROGRESS]: {
          label: i18n[STATUS.IN_PROGRESS],
          data: [
            {
              label: i18n[STATUS.IN_PROGRESS],
              data: 5,
            },
          ],
        },
        [STATUS.OPEN]: {
          label: i18n[STATUS.OPEN],
          data: [
            {
              label: i18n[STATUS.OPEN],
              data: 50,
            },
          ],
        },
      }
    );
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

  /**
   * Retrieves the first user with no incidents assigned.
   *
   * @returns The user with no incidents assigned, or undefined if no such user exists.
   * @author Jonathan Alvarado
   */
  private async getUserWithNoIncidentsAssigned() {
    const users = await this.user.findAll({
      include: {
        as: 'incidentsAssigned',
        model: Incident,
      },
      order: [['created_at', Order.ASC]],
      where: {
        roleId: 2,
        '$incidentsAssigned.assigned_to$': {
          [Op.eq]: null,
        },
      },
    });

    return users?.[0];
  }

  /**
   * Retrieves the user with the lowest amount of incidents assigned.
   *
   * @returns The user with the lowest amount of incidents assigned.
   * @author Jonathan Alvarado
   */
  private async getUserWithLowerAmountOfIncidentsAssigned() {
    const users = await this.user.findAll({
      attributes: {
        include: [
          [
            sequelize.fn(
              'count',
              sequelize.col('incidentsAssigned.assigned_to')
            ),
            'incidentCount',
          ],
        ],
      },
      include: {
        as: 'incidentsAssigned',
        model: Incident,
        required: true,
      },
      group: ['incidentsAssigned.assigned_to'],
      order: [['incidentCount', Order.ASC]],
      where: {
        roleId: 2,
      },
    });
    return users?.[0];
  }
}
