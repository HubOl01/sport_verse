import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Неверный email или пароль');
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(email: string, username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUserByEmail = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUserByEmail) {
      throw new UnauthorizedException(
        'Пользователь с таким email уже существует. Возможно вы уже зарегистрированы и надо войти',
      );
    }

    // Проверяем, существует ли пользователь с таким username
    const existingUserByUsername = await this.prisma.user.findUnique({
      where: { username },
    });
    if (existingUserByUsername) {
      throw new UnauthorizedException(
        'Пользователь с таким username уже существует',
      );
    }
    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        VKID: '',
        username,
        statusUser: 'USER',
        profile: {
          create: {
            name: username,
            statusId: 1,
            roleId: 1,
          },
        },
      },
      include: {
        profile: true,
      },
    });
    return newUser;
  }
}
