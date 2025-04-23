import { Injectable } from '@nestjs/common';
import { CreateViewsTrainingDto } from './dto/create-views-training.dto';
import { UpdateViewsTrainingDto } from './dto/update-views-training.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ViewsTrainingService {
  constructor(private prisma: PrismaService) {}
  create(createViewsTrainingDto: CreateViewsTrainingDto) {
    return this.prisma.viewsTraining.create({ data: createViewsTrainingDto });
  }
  // async createViewTraining(createViewsTrainingDto: CreateViewsTrainingDto) {
  //   const { userId, trainingPlanId } = createViewsTrainingDto;

  //   const existingView = await this.prisma.viewsTraining.findFirst({
  //     where: {
  //       userId,
  //       trainingPlanId,
  //     },
  //   });

  //   if (existingView) {
  //     return existingView;
  //   }

  //   return this.prisma.viewsTraining.create({
  //     data: createViewsTrainingDto,
  //   });
  // }
  async createViewTraining(createViewsTrainingDto: CreateViewsTrainingDto & { ip?: string }) {
    const { userId, trainingPlanId, ip } = createViewsTrainingDto;
  
    if (userId) {
      const existingView = await this.prisma.viewsTraining.findFirst({
        where: { userId, trainingPlanId },
      });
  
      if (existingView) return existingView;
    } else if (ip) {
      const existingView = await this.prisma.viewsTraining.findFirst({
        where: { ip, trainingPlanId },
      });
  
      if (existingView) return existingView;
    }
  
    return this.prisma.viewsTraining.create({
      data: {
        userId: userId || null,
        trainingPlanId,
        ip: ip || null,
      },
    });
  }
  

  findAll() {
    return this.prisma.viewsTraining.findMany();
  }

  findOne(id: number) {
    return this.prisma.viewsTraining.findUnique({ where: { id } });
  }

  update(id: number, updateViewsTrainingDto: UpdateViewsTrainingDto) {
    return this.prisma.viewsTraining.update({
      where: { id },
      data: updateViewsTrainingDto,
    });
  }

  remove(id: number) {
    return this.prisma.viewsTraining.delete({ where: { id } });
  }
}
