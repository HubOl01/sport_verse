import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@ApiTags('users')
// @UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAll() {
    return this.usersService.findAll();
  }
  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
  @Get('/email/:email')
  @ApiOkResponse({ type: UserEntity })
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }
  @Get('/username/:username')
  @ApiOkResponse({ type: UserEntity })
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }
  @Get('/username-profile/:username')
  @ApiOkResponse({ type: UserEntity })
  findByUsernameProfile(@Param('username') username: string) {
    return this.usersService.findByUsernameProfile(username);
  }
  @Get('/username-plan/:username')
  @ApiOkResponse({ type: UserEntity })
  findByUsernamePlan(@Param('username') username: string) {
    return this.usersService.findByUsernamePlan(username);
  }
  @Get('/username-group/:username')
  @ApiOkResponse({ type: UserEntity })
  findByUsernameGroup(@Param('username') username: string) {
    return this.usersService.findByUsernameGroup(username);
  }
  @Get('/username-sub/:username')
  @ApiOkResponse({ type: UserEntity })
  findByUsernameSub(@Param('username') username: string) {
    return this.usersService.findByUsernameSub(username);
  }
  @Patch(':id')
  @ApiCreatedResponse({ type: UserEntity })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  @Patch('/admin/:id')
  @ApiCreatedResponse({ type: UserEntity })
  updateAdmin(@Param('id') id: string) {
    return this.usersService.updateAdmin(+id);
  }

  @Patch('/user/:id')
  @ApiCreatedResponse({ type: UserEntity })
  updateUser(@Param('id') id: string) {
    return this.usersService.updateUser(+id);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
