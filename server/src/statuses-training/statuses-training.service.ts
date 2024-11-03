import { Injectable } from '@nestjs/common';
import { CreateStatusesTrainingDto } from './dto/create-statuses-training.dto';
import { UpdateStatusesTrainingDto } from './dto/update-statuses-training.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatusesTrainingService {
  constructor(private prisma: PrismaService) {}
  // create(createStatusesTrainingDto: CreateStatusesTrainingDto) {
  //   return 'This action adds a new statusesTraining';
  // }

  findAll() {
    return this.prisma.statusTraining.findMany();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} statusesTraining`;
  // }

  // update(id: number, updateStatusesTrainingDto: UpdateStatusesTrainingDto) {
  //   return `This action updates a #${id} statusesTraining`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} statusesTraining`;
  // }
}
