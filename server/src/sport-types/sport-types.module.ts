import { Module } from '@nestjs/common';
import { SportTypesService } from './sport-types.service';
import { SportTypesController } from './sport-types.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SportTypesController],
  providers: [SportTypesService],
  imports: [PrismaModule],
})
export class SportTypesModule {}
