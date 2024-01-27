import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TypesOfSportService } from './types-of-sport.service';
import { CreateTypesOfSportDto } from './dto/create-types-of-sport.dto';
import { UpdateTypesOfSportDto } from './dto/update-types-of-sport.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TypesOfSportEntity } from './entities/types-of-sport.entity';

@ApiTags('types of sport')
@Controller('types-of-sport')
export class TypesOfSportController {
  constructor(private readonly typesOfSportService: TypesOfSportService) {}

  @Post()
  @ApiCreatedResponse({ type: TypesOfSportEntity })
  create(@Body() createTypesOfSportDto: CreateTypesOfSportDto) {
    return this.typesOfSportService.create(createTypesOfSportDto);
  }

  @Get()
  @ApiOkResponse({ isArray: true })
  findAll() {
    return this.typesOfSportService.findAll();
  }

  @Get(':id')
  @ApiOkResponse()
  findOne(@Param('id') id: string) {
    return this.typesOfSportService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: TypesOfSportEntity })
  update(
    @Param('id') id: string,
    @Body() updateTypesOfSportDto: UpdateTypesOfSportDto,
  ) {
    return this.typesOfSportService.update(+id, updateTypesOfSportDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id') id: string) {
    return this.typesOfSportService.remove(+id);
  }
}
