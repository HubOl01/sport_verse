import { Module } from '@nestjs/common';
import { CommentTrainingService } from './comment-training.service';
import { CommentTrainingController } from './comment-training.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CommentTrainingController],
  providers: [CommentTrainingService],
  imports: [PrismaModule],
})
export class СommentTrainingModule {}
