import { Module } from '@nestjs/common';
import { StatusesTrainingService } from './statuses-training.service';
import { StatusesTrainingController } from './statuses-training.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [StatusesTrainingController],
  providers: [StatusesTrainingService],
  imports: [PrismaModule],
})
export class StatusesTrainingModule {}
