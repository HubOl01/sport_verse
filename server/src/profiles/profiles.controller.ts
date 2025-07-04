import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('profiles')
@ApiTags('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @ApiCreatedResponse()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }
  @Get()
  @ApiOkResponse()
  findAll() {
    return this.profilesService.findAll();
  }
  @Get(':id')
  @ApiOkResponse()
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(+id);
  }
  @Patch(':id')
  @ApiCreatedResponse()
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update(+id, updateProfileDto);
  }
  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id') id: string) {
    return this.profilesService.remove(+id);
  }
}
