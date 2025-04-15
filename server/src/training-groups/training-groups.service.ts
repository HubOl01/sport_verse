import { Injectable } from '@nestjs/common';
import { CreateTrainingGroupDto } from './dto/create-training-group.dto';
import { UpdateTrainingGroupDto } from './dto/update-training-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrainingGroupsService {
  constructor(private prisma: PrismaService) {}
  create(createTrainingGroupDto: CreateTrainingGroupDto) {
    return this.prisma.trainingGroup.create({ data: createTrainingGroupDto });
  }

  findAll() {
    return this.prisma.trainingGroup.findMany();
  }

  findOne(id: number) {
    return this.prisma.trainingGroup.findUnique({ where: { id } });
  }

  update(id: number, updateTrainingGroupDto: UpdateTrainingGroupDto) {
    return this.prisma.trainingGroup.update({
      where: { id },
      data: updateTrainingGroupDto,
    });
  }

  remove(id: number) {
    return this.prisma.trainingGroup.delete({ where: { id } });
  }
}
