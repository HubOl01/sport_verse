import { Injectable } from '@nestjs/common';
import { CreateAthleteInGroupDto } from './dto/create-athlete-in-group.dto';
import { UpdateAthleteInGroupDto } from './dto/update-athlete-in-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AthleteInGroupsService {
  constructor(private prisma: PrismaService) {}
  create(createAthleteInGroupDto: CreateAthleteInGroupDto) {
    return this.prisma.athleteInGroup.create({ data: createAthleteInGroupDto });
  }

  findAll() {
    return this.prisma.athleteInGroup.findMany();
  }

  findOne(id: number) {
    return this.prisma.athleteInGroup.findUnique({ where: { id } });
  }

  update(id: number, updateAthleteInGroupDto: UpdateAthleteInGroupDto) {
    return this.prisma.athleteInGroup.update({
      data: updateAthleteInGroupDto,
      where: { id },
    });
  }

  remove(id: number) {
    return this.prisma.athleteInGroup.delete({ where: { id } });
  }
  removeUser(idUser: number) {
    return this.prisma.athleteInGroup.deleteMany({
      where: {
        athleteId: idUser,
      },
    });
  }
}
