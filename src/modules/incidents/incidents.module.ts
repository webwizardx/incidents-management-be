import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/models/user.model';
import { IncidentsController } from './incidents.controller';
import { IncidentsService } from './incidents.service';
import { Incident } from './models/incident.model';
import { CategoriesModule } from './modules/categories/categories.module';
import { Category } from './modules/categories/models/category.model';
import { CommentsModule } from './modules/comments/comments.module';
import { Comment } from './modules/comments/models/comment.model';
import { Status } from './modules/status/models/status.model';
import { StatusModule } from './modules/status/status.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Category, Comment, Incident, Status, User]),
    StatusModule,
    CategoriesModule,
    CommentsModule,
  ],
  controllers: [IncidentsController],
  providers: [IncidentsService],
})
export class IncidentsModule {}
