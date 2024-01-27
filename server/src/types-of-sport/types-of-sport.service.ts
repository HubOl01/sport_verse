import { Injectable } from '@nestjs/common';
import { CreateTypesOfSportDto } from './dto/create-types-of-sport.dto';
import { UpdateTypesOfSportDto } from './dto/update-types-of-sport.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TypesOfSportService {
  constructor(private prisma: PrismaService) {}
  create(createTypesOfSportDto: CreateTypesOfSportDto) {
    return this.prisma.typeOfSport.create({ data: createTypesOfSportDto });
  }

  findAll() {
    return this.prisma.typeOfSport.findMany();
  }

  findOne(id: number) {
    return this.prisma.typeOfSport.findUnique({ where: { idTypeOfSport: id } });
  }

  update(id: number, updateTypesOfSportDto: UpdateTypesOfSportDto) {
    return this.prisma.typeOfSport.update({
      where: { idTypeOfSport: id },
      data: updateTypesOfSportDto,
    });
  }

  remove(id: number) {
    return this.prisma.typeOfSport.delete({ where: { idTypeOfSport: id } });
  }
}
