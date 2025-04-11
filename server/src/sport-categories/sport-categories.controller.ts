import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SportCategoriesService } from './sport-categories.service';
import { CreateSportCategoryDto } from './dto/create-sport-category.dto';
import { UpdateSportCategoryDto } from './dto/update-sport-category.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SportCategoryEntity } from './entities/sport-category.entity';

@Controller('sport-categories')
@ApiTags('sport-categories')
export class SportCategoriesController {
  constructor(
    private readonly sportCategoriesService: SportCategoriesService,
  ) {}
  @Post()
  @ApiCreatedResponse({ type: SportCategoryEntity })
  create(@Body() createSportCategoryDto: CreateSportCategoryDto) {
    return this.sportCategoriesService.create(createSportCategoryDto);
  }

  @Get()
  @ApiOkResponse({ type: SportCategoryEntity, isArray: true })
  findAll() {
    return this.sportCategoriesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: SportCategoryEntity })
  findOne(@Param('id') id: string) {
    return this.sportCategoriesService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: SportCategoryEntity })
  update(
    @Param('id') id: string,
    @Body() updateSportCategoryDto: UpdateSportCategoryDto,
  ) {
    return this.sportCategoriesService.update(+id, updateSportCategoryDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: SportCategoryEntity })
  remove(@Param('id') id: string) {
    return this.sportCategoriesService.remove(+id);
  }
}
