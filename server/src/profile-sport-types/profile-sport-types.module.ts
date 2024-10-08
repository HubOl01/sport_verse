import { Module } from '@nestjs/common';
import { ProfileSportTypesService } from './profile-sport-types.service';
import { ProfileSportTypesController } from './profile-sport-types.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ProfileSportTypesController],
  providers: [ProfileSportTypesService],
  imports: [PrismaModule],
})
export class ProfileSportTypesModule {}
