import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }
  findAll() {
    return this.prisma.user.findMany();
  }
  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id: id } });
  }
  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
  findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
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
            isVerified: true,
            userId: true,
            status: true,
            role: true,
            sportType: true,
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

  remove(id: number) {
    return this.prisma.user.delete({ where: { id: id } });
  }
}
