import { Module } from '@nestjs/common';
import { LikeTrainingService } from './like-training.service';
import { LikeTrainingController } from './like-training.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [LikeTrainingController],
  providers: [LikeTrainingService],
  imports: [PrismaModule],
})
export class LikeTrainingModule {}
