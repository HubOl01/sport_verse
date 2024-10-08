import { Module } from '@nestjs/common';
import { ExerciseCategoriesService } from './exercise-categories.service';
import { ExerciseCategoriesController } from './exercise-categories.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ExerciseCategoriesController],
  providers: [ExerciseCategoriesService],
  imports: [PrismaModule],
})
export class ExerciseCategoriesModule {}
