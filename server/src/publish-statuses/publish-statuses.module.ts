import { Module } from '@nestjs/common';
import { PublishStatusesService } from './publish-statuses.service';
import { PublishStatusesController } from './publish-statuses.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PublishStatusesController],
  providers: [PublishStatusesService],
  imports: [PrismaModule],
})
export class PublishStatusesModule {}
