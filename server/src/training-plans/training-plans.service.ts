import { Injectable } from '@nestjs/common';
import { CreateTrainingPlanDto } from './dto/create-training-plan.dto';
import { UpdateTrainingPlanDto } from './dto/update-training-plan.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrainingPlansService {
  constructor(private prisma: PrismaService) {}
  create(createTrainingPlanDto: CreateTrainingPlanDto) {
    return 'This action adds a new trainingPlan';
  }

  findAll() {
    return `This action returns all trainingPlans`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trainingPlan`;
  }

  update(id: number, updateTrainingPlanDto: UpdateTrainingPlanDto) {
    return `This action updates a #${id} trainingPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} trainingPlan`;
  }
}
