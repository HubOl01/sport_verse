import { Module } from '@nestjs/common';
import { TrainingGroupsService } from './training-groups.service';
import { TrainingGroupsController } from './training-groups.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TrainingGroupsController],
  providers: [TrainingGroupsService],
  imports: [PrismaModule],
})
export class TrainingGroupsModule {}
