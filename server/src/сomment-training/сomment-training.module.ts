import { Module } from '@nestjs/common';
import { СommentTrainingService } from './сomment-training.service';
import { СommentTrainingController } from './сomment-training.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [СommentTrainingController],
  providers: [СommentTrainingService],
  imports: [PrismaModule],
})
export class СommentTrainingModule {}
