import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Incident } from '../../models/incident.model';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './models/category.model';

@Module({
  imports: [SequelizeModule.forFeature([Category, Incident])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
