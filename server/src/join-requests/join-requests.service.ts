import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JoinRequestsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Отправка запроса на присоединение к группе
   */
  async requestToJoinGroup(trainingGroupId: number, athleteId: number) {
    // Проверяем, существует ли группа
    const group = await this.prisma.trainingGroup.findUnique({
      where: { id: trainingGroupId },
    });
    if (!group) {
      throw new NotFoundException('Training group not found');
    }

    // Проверяем, является ли группа закрытой
    if (group.isPrivate === 0) {
      throw new BadRequestException('This group is not private');
    }

    // Проверяем, не отправлен ли уже запрос
    const existingRequest = await this.prisma.joinRequest.findUnique({
      where: {
        trainingGroupId_athleteId: { trainingGroupId, athleteId },
      },
    });
    if (existingRequest) {
      throw new BadRequestException('You have already sent a join request');
    }

    // Проверяем, не состоит ли спортсмен уже в группе
    const existingMembership = await this.prisma.athleteInGroup.findUnique({
      where: {
        trainingGroupId_athleteId: { trainingGroupId, athleteId },
      },
    });
    if (existingMembership) {
      throw new BadRequestException('You are already a member of this group');
    }

    // Создаём новый запрос
    return this.prisma.joinRequest.create({
      data: {
        trainingGroupId,
        athleteId,
      },
    });
  }

  /**
   * Обработка запроса тренером (одобрение/отклонение)
   */
  async handleJoinRequest(
    requestId: number,
    status: 'approved' | 'rejected',
    trainerId: number,
  ) {
    // Находим запрос
    const request = await this.prisma.joinRequest.findUnique({
      where: { id: requestId },
      include: {
        trainingGroup: true,
      },
    });
    if (!request) {
      throw new NotFoundException('Join request not found');
    }

    // Проверяем, что текущий пользователь является тренером группы
    if (request.trainingGroup.trainerId !== trainerId) {
      throw new ForbiddenException('You are not the trainer of this group');
    }

    // Обновляем статус запроса
    const updatedRequest = await this.prisma.joinRequest.update({
      where: { id: requestId },
      data: { status },
    });

    // Если запрос одобрен, добавляем спортсмена в группу
    if (status === 'approved') {
      await this.prisma.athleteInGroup.create({
        data: {
          trainingGroupId: request.trainingGroupId,
          athleteId: request.athleteId,
        },
      });
    }

    return updatedRequest;
  }

  /**
   * Получение всех запросов
   */
  findAll() {
    return this.prisma.joinRequest.findMany({
      include: {
        trainingGroup: true,
        athlete: true,
      },
    });
  }

  /**
   * Получение одного запроса
   */
  findOne(id: number) {
    return this.prisma.joinRequest.findUnique({
      where: { id },
      include: {
        trainingGroup: true,
        athlete: true,
      },
    });
  }

  /**
   * Удаление запроса
   */
  remove(id: number) {
    return this.prisma.joinRequest.delete({ where: { id } });
  }
}
