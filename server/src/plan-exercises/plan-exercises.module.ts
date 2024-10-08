import { Module } from '@nestjs/common';
import { PlanExercisesService } from './plan-exercises.service';
import { PlanExercisesController } from './plan-exercises.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PlanExercisesController],
  providers: [PlanExercisesService],
  imports: [PrismaModule],
})
export class PlanExercisesModule {}
