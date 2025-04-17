import { Module } from '@nestjs/common';
import { PlanInGroupsService } from './plan-in-groups.service';
import { PlanInGroupsController } from './plan-in-groups.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PlanInGroupsController],
  providers: [PlanInGroupsService],
  imports: [PrismaModule],
})
export class PlanInGroupsModule {}
