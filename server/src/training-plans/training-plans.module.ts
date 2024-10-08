import { Module } from '@nestjs/common';
import { TrainingPlansService } from './training-plans.service';
import { TrainingPlansController } from './training-plans.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TrainingPlansController],
  providers: [TrainingPlansService],
  imports: [PrismaModule],
})
export class TrainingPlansModule {}
