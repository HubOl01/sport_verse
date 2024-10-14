import { Injectable } from '@nestjs/common';
import { CreateTrainingResultDto } from './dto/create-training-result.dto';
import { UpdateTrainingResultDto } from './dto/update-training-result.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrainingResultsService {
  constructor(private prisma: PrismaService) {}
  create(createTrainingResultDto: CreateTrainingResultDto) {
    return this.prisma.trainingResult.create({ data: createTrainingResultDto });
  }

  findAll() {
    return this.prisma.trainingResult.findMany();
  }

  findOne(id: number) {
    return this.prisma.trainingResult.findUnique({ where: { id: id } });
  }

  update(id: number, updateTrainingResultDto: UpdateTrainingResultDto) {
    return this.prisma.trainingResult.update({
      data: updateTrainingResultDto,
      where: { id: id },
    });
  }

  remove(id: number) {
    return this.prisma.trainingResult.delete({ where: { id: id } });
  }
}
