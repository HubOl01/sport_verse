import { Injectable } from '@nestjs/common';
import { CreateTrainingPlanDto } from './dto/create-training-plan.dto';
import { UpdateTrainingPlanDto } from './dto/update-training-plan.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrainingPlansService {
  constructor(private prisma: PrismaService) {}
  create(createTrainingPlanDto: CreateTrainingPlanDto) {
    return this.prisma.trainingPlan.create({ data: createTrainingPlanDto });
  }

  findAll() {
    return this.prisma.trainingPlan.findMany();
  }

  findOne(id: number) {
    return this.prisma.trainingPlan.findUnique({ where: { id: id } });
  }

  update(id: number, updateTrainingPlanDto: UpdateTrainingPlanDto) {
    return this.prisma.trainingPlan.update({
      data: updateTrainingPlanDto,
      where: { id: id },
    });
  }

  remove(id: number) {
    return this.prisma.trainingPlan.delete({ where: { id: id } });
  }
}
