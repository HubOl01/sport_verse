import { Module } from '@nestjs/common';
import { AthleteInGroupsService } from './athlete-in-groups.service';
import { AthleteInGroupsController } from './athlete-in-groups.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AthleteInGroupsController],
  providers: [AthleteInGroupsService],
  imports: [PrismaModule],
})
export class AthleteInGroupsModule {}
