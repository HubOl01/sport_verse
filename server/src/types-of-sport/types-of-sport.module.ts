import { Module } from '@nestjs/common';
import { TypesOfSportService } from './types-of-sport.service';
import { TypesOfSportController } from './types-of-sport.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TypesOfSportController],
  providers: [TypesOfSportService],
  imports: [PrismaModule]
})
export class TypesOfSportModule {}
