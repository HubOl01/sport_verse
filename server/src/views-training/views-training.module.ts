import { Module } from '@nestjs/common';
import { ViewsTrainingService } from './views-training.service';
import { ViewsTrainingController } from './views-training.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ViewsTrainingController],
  providers: [ViewsTrainingService],
  imports: [PrismaModule]
})
export class ViewsTrainingModule {}
