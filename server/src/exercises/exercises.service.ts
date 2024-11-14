import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaService) {}
  create(createExerciseDto: CreateExerciseDto) {
    return this.prisma.exercise.create({ data: createExerciseDto });
  }

  findAll() {
    return this.prisma.exercise.findMany();
  }

  findAllPublic() {
    return this.prisma.exercise.findMany({
      where: {
        isPrivate: false,
      },
    });
  }

  findOneExercise(name: string) {
    return this.prisma.exercise.findFirst({
      where: {
        name: {
          equals: name.toLowerCase(),
          mode: 'insensitive',
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.exercise.findUnique({ where: { id: id } });
  }

  update(id: number, updateExerciseDto: UpdateExerciseDto) {
    return this.prisma.exercise.update({
      data: updateExerciseDto,
      where: { id: id },
    });
  }

  remove(id: number) {
    return this.prisma.exercise.delete({ where: { id: id } });
  }
}
