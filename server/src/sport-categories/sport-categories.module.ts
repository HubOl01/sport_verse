import { Module } from '@nestjs/common';
import { SportCategoriesService } from './sport-categories.service';
import { SportCategoriesController } from './sport-categories.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SportCategoriesController],
  providers: [SportCategoriesService],
  imports: [PrismaModule],
})
export class SportCategoriesModule {}
