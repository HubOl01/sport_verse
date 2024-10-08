import { Injectable } from '@nestjs/common';
import { CreateSportTypeDto } from './dto/create-sport-type.dto';
import { UpdateSportTypeDto } from './dto/update-sport-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SportTypesService {
  constructor(private prisma: PrismaService) {}
  // create(createSportTypeDto: CreateSportTypeDto) {
  //   return this.prisma.sportType.create({ data: createSportTypeDto });
  // }

  findAll() {
    return this.prisma.sportType.findMany();
  }

  // findOne(id: number) {
  //   return this.prisma.sportType.findUnique({ where: { id: id } });
  // }

  // update(id: number, updateSportTypeDto: UpdateSportTypeDto) {
  //   return this.prisma.sportType.update({
  //     where: { id: id },
  //     data: updateSportTypeDto,
  //   });
  // }

  // remove(id: number) {
  //   return this.prisma.sportType.delete({ where: { id: id } });
  // }
}
