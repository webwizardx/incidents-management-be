import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { IncidentsController } from './incidents.controller';
import { IncidentsService } from './incidents.service';
import { Category } from './models/category.model';
import { Comment } from './models/comment.model';
import { Incident } from './models/incident.model';
import { Status } from './models/status.model';

@Module({
  imports: [SequelizeModule.forFeature([Category, Comment, Incident, Status])],
  controllers: [IncidentsController],
  providers: [IncidentsService],
})
export class IncidentsModule {}
