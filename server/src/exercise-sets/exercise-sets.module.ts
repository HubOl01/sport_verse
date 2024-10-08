import { Module } from '@nestjs/common';
import { ExerciseSetsService } from './exercise-sets.service';
import { ExerciseSetsController } from './exercise-sets.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ExerciseSetsController],
  providers: [ExerciseSetsService],
  imports: [PrismaModule],
})
export class ExerciseSetsModule {}
