import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}
  create(createSubscriptionDto: CreateSubscriptionDto) {
    return this.prisma.subscription.create({ data: createSubscriptionDto });
  }

  findAll() {
    return this.prisma.subscription.findMany();
  }

  findOne(id: number) {
    return this.prisma.subscription.findUnique({ where: { id } });
  }

  update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.prisma.subscription.update({
      where: { id },
      data: updateSubscriptionDto,
    });
  }

  remove(subscriberId: number, subscribedToId: number) {
    return this.prisma.subscription.delete({
      where: {
        subscriberId_subscribedToId: {
          subscriberId: subscriberId,
          subscribedToId: subscribedToId,
        },
      },
    });
  }
}
