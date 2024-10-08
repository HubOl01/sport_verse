import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileSportTypesService } from './profile-sport-types.service';
import { CreateProfileSportTypeDto } from './dto/create-profile-sport-type.dto';
import { UpdateProfileSportTypeDto } from './dto/update-profile-sport-type.dto';

@Controller('profile-sport-types')
export class ProfileSportTypesController {
  constructor(private readonly profileSportTypesService: ProfileSportTypesService) {}

  @Post()
  create(@Body() createProfileSportTypeDto: CreateProfileSportTypeDto) {
    return this.profileSportTypesService.create(createProfileSportTypeDto);
  }

  @Get()
  findAll() {
    return this.profileSportTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileSportTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileSportTypeDto: UpdateProfileSportTypeDto) {
    return this.profileSportTypesService.update(+id, updateProfileSportTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileSportTypesService.remove(+id);
  }
}
