import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { StatusUser } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }
  findAll() {
    return this.prisma.user.findMany({
      include: {
        profile: {
          select: {
            id: true,
            name: true,
            dateOfBirth: true,
            url_avatar: true,
            about: true,
            statusId: true,
            roleId: true,
            startSportDate: true,
            endSportDate: true,
            isVerified: true,
            userId: true,
            status: true,
            role: true,
            sportType: true,
            sportCategory: true,
            ProfileSportType: true,
          },
        },
        TrainingPlan: true,
        athleteInGroups: true,
        trainerInGroups: true,
        subscriptions: true,
        subscribers: true,
      },
    });
  }
  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id: id },
      include: {
        profile: {
          select: {
            id: true,
            name: true,
            dateOfBirth: true,
            url_avatar: true,
            about: true,
            statusId: true,
            roleId: true,
            startSportDate: true,
            endSportDate: true,
            isVerified: true,
            userId: true,
            status: true,
            role: true,
            sportType: true,
            sportCategory: true,
            ProfileSportType: true,
          },
        },
        TrainingPlan: true,
        athleteInGroups: true,
        trainerInGroups: true,
        subscriptions: {
          include: {
            subscriber: {
              include: {
                subscribers: true,
                subscriptions: true,
                profile: {
                  select: {
                    id: true,
                    name: true,
                    dateOfBirth: true,
                    url_avatar: true,
                    about: true,
                    statusId: true,
                    roleId: true,
                    startSportDate: true,
                    endSportDate: true,
                    isVerified: true,
                    userId: true,
                    status: true,
                    role: true,
                    sportType: true,
                    sportCategory: true,
                    ProfileSportType: true,
                  },
                },
              },
            },
            subscribedTo: {
              include: {
                subscribers: true,
                subscriptions: true,
                profile: {
                  select: {
                    id: true,
                    name: true,
                    dateOfBirth: true,
                    url_avatar: true,
                    about: true,
                    statusId: true,
                    roleId: true,
                    startSportDate: true,
                    endSportDate: true,
                    isVerified: true,
                    userId: true,
                    status: true,
                    role: true,
                    sportType: true,
                    sportCategory: true,
                    ProfileSportType: true,
                  },
                },
              },
            },
          },
        },
        subscribers: {
          include: {
            subscriber: {
              include: {
                subscribers: true,
                subscriptions: true,
                profile: {
                  select: {
                    id: true,
                    name: true,
                    dateOfBirth: true,
                    url_avatar: true,
                    about: true,
                    statusId: true,
                    roleId: true,
                    startSportDate: true,
                    endSportDate: true,
                    isVerified: true,
                    userId: true,
                    status: true,
                    role: true,
                    sportType: true,
                    sportCategory: true,
                    ProfileSportType: true,
                  },
                },
              },
            },
            subscribedTo: {
              include: {
                subscribers: true,
                subscriptions: true,
                profile: {
                  select: {
                    id: true,
                    name: true,
                    dateOfBirth: true,
                    url_avatar: true,
                    about: true,
                    statusId: true,
                    roleId: true,
                    startSportDate: true,
                    endSportDate: true,
                    isVerified: true,
                    userId: true,
                    status: true,
                    role: true,
                    sportType: true,
                    sportCategory: true,
                    ProfileSportType: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
  findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username: username },
      include: {
        profile: {
          select: {
            id: true,
            name: true,
            dateOfBirth: true,
            url_avatar: true,
            about: true,
            statusId: true,
            roleId: true,
            startSportDate: true,
            endSportDate: true,
            isVerified: true,
            userId: true,
            status: true,
            role: true,
            sportType: true,
            sportCategory: true,
            ProfileSportType: true,
          },
        },
        TrainingPlan: true,
        athleteInGroups: true,
        trainerInGroups: true,
        subscriptions: {
          include: {
            subscriber: {
              include: {
                subscribers: true,
                subscriptions: true,
                profile: {
                  select: {
                    id: true,
                    name: true,
                    dateOfBirth: true,
                    url_avatar: true,
                    about: true,
                    statusId: true,
                    roleId: true,
                    startSportDate: true,
                    endSportDate: true,
                    isVerified: true,
                    userId: true,
                    status: true,
                    role: true,
                    sportType: true,
                    sportCategory: true,
                    ProfileSportType: true,
                  },
                },
              },
            },
            subscribedTo: {
              include: {
                subscribers: true,
                subscriptions: true,
                profile: {
                  select: {
                    id: true,
                    name: true,
                    dateOfBirth: true,
                    url_avatar: true,
                    about: true,
                    statusId: true,
                    roleId: true,
                    startSportDate: true,
                    endSportDate: true,
                    isVerified: true,
                    userId: true,
                    status: true,
                    role: true,
                    sportType: true,
                    sportCategory: true,
                    ProfileSportType: true,
                  },
                },
              },
            },
          },
        },
        subscribers: {
          include: {
            subscriber: {
              include: {
                subscribers: true,
                subscriptions: true,
                profile: {
                  select: {
                    id: true,
                    name: true,
                    dateOfBirth: true,
                    url_avatar: true,
                    about: true,
                    statusId: true,
                    roleId: true,
                    startSportDate: true,
                    endSportDate: true,
                    isVerified: true,
                    userId: true,
                    status: true,
                    role: true,
                    sportType: true,
                    sportCategory: true,
                    ProfileSportType: true,
                  },
                },
              },
            },
            subscribedTo: {
              include: {
                subscribers: true,
                subscriptions: true,
                profile: {
                  select: {
                    id: true,
                    name: true,
                    dateOfBirth: true,
                    url_avatar: true,
                    about: true,
                    statusId: true,
                    roleId: true,
                    startSportDate: true,
                    endSportDate: true,
                    isVerified: true,
                    userId: true,
                    status: true,
                    role: true,
                    sportType: true,
                    sportCategory: true,
                    ProfileSportType: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id: id },
      data: updateUserDto,
    });
  }
  updateAdmin(id: number) {
    return this.prisma.user.update({
      where: { id: id },
      data: { statusUser: StatusUser.ADMIN },
    });
  }
  updateUser(id: number) {
    return this.prisma.user.update({
      where: { id: id },
      data: { statusUser: StatusUser.USER },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id: id } });
  }
}
