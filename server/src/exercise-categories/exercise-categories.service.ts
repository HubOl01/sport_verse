import { Injectable } from '@nestjs/common';
import { CreateExerciseCategoryDto } from './dto/create-exercise-category.dto';
import { UpdateExerciseCategoryDto } from './dto/update-exercise-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExerciseCategoriesService {
  constructor(private prisma: PrismaService) {}
  findAll() {
    return this.prisma.exerciseCategory.findMany();
  }
}
