import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/modules/users/models/user.model';
import { Incident } from '../../models/incident.model';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from './models/comment.model';

@Module({
  exports: [CommentsService],
  imports: [SequelizeModule.forFeature([Comment, Incident, User])],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
