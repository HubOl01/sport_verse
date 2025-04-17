import { Module } from '@nestjs/common';
import { JoinRequestsService } from './join-requests.service';
import { JoinRequestsController } from './join-requests.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [JoinRequestsController],
  providers: [JoinRequestsService],
  imports: [PrismaModule]
})
export class JoinRequestsModule {}
