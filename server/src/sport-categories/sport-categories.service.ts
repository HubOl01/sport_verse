import { Injectable } from '@nestjs/common';
import { CreateSportCategoryDto } from './dto/create-sport-category.dto';
import { UpdateSportCategoryDto } from './dto/update-sport-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SportCategoriesService {
  constructor(private prisma: PrismaService) {}
  create(createSportCategoryDto: CreateSportCategoryDto) {
    return this.prisma.sportCategory.create({ data: createSportCategoryDto });
  }

  findAll() {
    return this.prisma.sportCategory.findMany();
  }

  findOne(id: number) {
    return this.prisma.sportCategory.findUnique({ where: { id } });
  }

  update(id: number, updateSportCategoryDto: UpdateSportCategoryDto) {
    return this.prisma.sportCategory.update({
      where: { id },
      data: updateSportCategoryDto,
    });
  }

  remove(id: number) {
    return this.prisma.sportCategory.delete({ where: { id } });
  }
}
