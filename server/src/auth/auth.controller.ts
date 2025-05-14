import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

class RegisterDto {
  email: string;
  username: string;
  password: string;
}

class LoginDto {
  email: string;
  password: string;
}

export class VkAuthDto {
  email: string;
  vkid: string;
  username?: string;
}

@ApiTags('auth') // Добавляем тег для Swagger
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('vk')
  @ApiOperation({ summary: 'Авторизация через VK' })
  @ApiBody({
    description: 'Данные для авторизации через VK',
    schema: {
      example: {
        email: 'string',
        vkid: 'string',
        username: 'string',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Успешная авторизация через VK, возвращает access token',
  })
  @ApiResponse({ status: 401, description: 'Ошибка авторизации через VK' })
  async vkLogin(
    @Body() body: { email: string; vkid: string; username: string },
  ) {
    // Логика проверки/создания пользователя на основе VK данных
    const user = await this.authService.findOrCreateVKUser(
      body.email,
      body.vkid,
      body.username,
    );

    // Возвращаем токен
    return this.authService.login(user);
  }

  @Post('register')
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiBody({
    description: 'Данные для регистрации',
    schema: {
      example: {
        password: 'string',
        VKID: 'string',
        email: 'string',
        username: 'string',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Пользователь успешно зарегистрирован',
  })
  @ApiResponse({ status: 400, description: 'Ошибка валидации' })
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body.email, body.username, body.password);
  }

  @Post('login')
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiBody({
    description: 'Данные для входа',
    schema: {
      example: {
        email: 'string',
        password: 'string',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Успешный вход, возвращает access token',
  })
  @ApiResponse({ status: 401, description: 'Неверный email или пароль' })
  async login(@Body() body: LoginDto) {
    return this.authService.validateUser(body.email, body.password);
  }
}
