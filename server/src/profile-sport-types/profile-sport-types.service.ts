import { Injectable } from '@nestjs/common';
import { CreateProfileSportTypeDto } from './dto/create-profile-sport-type.dto';
import { UpdateProfileSportTypeDto } from './dto/update-profile-sport-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileSportTypesService {
  constructor(private prisma: PrismaService) {}
  create(createProfileSportTypeDto: CreateProfileSportTypeDto) {
    return 'This action adds a new profileSportType';
  }

  findAll() {
    return `This action returns all profileSportTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profileSportType`;
  }

  update(id: number, updateProfileSportTypeDto: UpdateProfileSportTypeDto) {
    return `This action updates a #${id} profileSportType`;
  }

  remove(id: number) {
    return `This action removes a #${id} profileSportType`;
  }
}
