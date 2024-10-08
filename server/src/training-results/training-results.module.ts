import { Module } from '@nestjs/common';
import { TrainingResultsService } from './training-results.service';
import { TrainingResultsController } from './training-results.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TrainingResultsController],
  providers: [TrainingResultsService],
  imports: [PrismaModule],
})
export class TrainingResultsModule {}
