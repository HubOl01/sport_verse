import { Injectable } from '@nestjs/common';
import { CreateProfileSportTypeDto } from './dto/create-profile-sport-type.dto';
import { UpdateProfileSportTypeDto } from './dto/update-profile-sport-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileSportTypesService {
  constructor(private prisma: PrismaService) {}
  create(createProfileSportTypeDto: CreateProfileSportTypeDto) {
    return this.prisma.profileSportType.create({
      data: createProfileSportTypeDto,
    });
  }

  findAll() {
    return this.prisma.profileSportType.findMany();
  }

  findOne(id: number) {
    return this.prisma.profileSportType.findUnique({ where: { id: id } });
  }

  update(id: number, updateProfileSportTypeDto: UpdateProfileSportTypeDto) {
    return this.prisma.profileSportType.update({
      data: updateProfileSportTypeDto,
      where: { id: id },
    });
  }

  remove(id: number) {
    return this.prisma.profileSportType.delete({ where: { id: id } });
  }
}
