import { Injectable } from '@nestjs/common';
import { CreateTrainingGroupDto } from './dto/create-training-group.dto';
import { UpdateTrainingGroupDto } from './dto/update-training-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TrainingGroup } from '@prisma/client';

@Injectable()
export class TrainingGroupsService {
  constructor(private prisma: PrismaService) {}
  create(createTrainingGroupDto: CreateTrainingGroupDto) {
    return this.prisma.trainingGroup.create({ data: createTrainingGroupDto });
  }

  findAll() {
    return this.prisma.trainingGroup.findMany({
      where: { isPrivate: 0 },
      include: {
        trainer: {
          include: {
            profile: {
              select: {
                name: true,
                url_avatar: true,
                status: true,
              },
            },
          },
        },
        sportType: true,
        athletes: {
          include: {
            athlete: {
              select: {
                id: true,
                username: true,
                profile: {
                  select: {
                    url_avatar: true,
                    status: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  findSearch(search: string, limit?: number) {
    return this.prisma.trainingGroup.findMany({
      where: {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
      take: limit,
      include: {
        sportType: true,
        trainer: {
          include: {
            profile: {
              select: {
                name: true,
                url_avatar: true,
                status: true,
              },
            },
          },
        },
        athletes: {
          include: {
            athlete: {
              select: {
                id: true,
                username: true,
                profile: {
                  select: {
                    url_avatar: true,
                    status: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  // findSearch(search: string, limit?: number) {
  //   if (!search.trim()) {
  //     throw new BadRequestException('Search parameter is required');
  //   }

  //   const words = search.split(' ').filter(Boolean); // Разделяем строку по пробелам

  //   return this.prisma.trainingGroup.findMany({
  //     where: {
  //       OR: words.map((word) => ({
  //         title: {
  //           contains: word,
  //           mode: 'insensitive',
  //         },
  //       })),
  //     },
  //     take: limit,
  //     include: {
  //       sportType: true,
  //     },
  //   });
  // }

  findOne(id: number) {
    return this.prisma.trainingGroup.findUnique({
      where: { id },
      include: {
        sportType: true,
        trainer: {
          include: {
            profile: {
              select: {
                name: true,
                url_avatar: true,
                status: true,
              },
            },
          },
        },
        athletes: {
          include: {
            athlete: {
              select: {
                id: true,
                username: true,
                profile: {
                  select: {
                    url_avatar: true,
                    status: true,
                  },
                },
              },
            },
          },
        },
        PlanInGroup: {
          include: {
            plan: {
              include: {
                user: {
                  select: {
                    email: true,
                    username: true,
                    profile: {
                      select: {
                        url_avatar: true,
                        status: true,
                      },
                    },
                  },
                },
                statusPublish: true,
                parentUser: {
                  select: {
                    email: true,
                    username: true,
                    profile: {
                      select: {
                        url_avatar: true,
                        status: true,
                      },
                    },
                  },
                },
                sportType: true,
                PlanExercise: {
                  include: {
                    exercise: true,
                  },
                },
                StatusTraining: true,
              },
            },
          },
        },
      },
    });
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
