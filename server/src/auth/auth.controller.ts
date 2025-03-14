import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

// @Controller('auth')
// @ApiTags('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @Post('register')
//   async register(
//     @Body() body: { email: string; username: string; password: string },
//   ) {
//     return this.authService.register(body.email, body.username, body.password);
//   }

//   @Post('login')
//   async login(@Body() body: { email: string; password: string }) {
//     return this.authService.validateUser(body.email, body.password);
//   }
// }
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

@ApiTags('auth') // Добавляем тег для Swagger
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
