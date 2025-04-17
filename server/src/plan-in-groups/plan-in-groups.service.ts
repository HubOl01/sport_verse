import { Injectable } from '@nestjs/common';
import { CreatePlanInGroupDto } from './dto/create-plan-in-group.dto';
import { UpdatePlanInGroupDto } from './dto/update-plan-in-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlanInGroupsService {
  constructor(private prisma: PrismaService) {}
  create(createPlanInGroupDto: CreatePlanInGroupDto) {
    return this.prisma.planInGroup.create({ data: createPlanInGroupDto });
  }

  findAll() {
    return this.prisma.planInGroup.findMany();
  }

  findOne(id: number) {
    return this.prisma.planInGroup.findUnique({ where: { id } });
  }

  update(id: number, updatePlanInGroupDto: UpdatePlanInGroupDto) {
    return this.prisma.planInGroup.update({
      where: { id },
      data: updatePlanInGroupDto,
    });
  }

  remove(id: number) {
    return this.prisma.planInGroup.delete({ where: { id } });
  }
}
