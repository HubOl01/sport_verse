import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ViewsTrainingService } from './views-training.service';
import { CreateViewsTrainingDto } from './dto/create-views-training.dto';
import { UpdateViewsTrainingDto } from './dto/update-views-training.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ViewsTrainingEntity } from './entities/views-training.entity';

@Controller('views-training')
@ApiTags('views-training')
export class ViewsTrainingController {
  constructor(private readonly viewsTrainingService: ViewsTrainingService) {}

  @Post()
  @ApiCreatedResponse()
  create(@Body() createViewsTrainingDto: CreateViewsTrainingDto) {
    return this.viewsTrainingService.create(createViewsTrainingDto);
  }

  @Get()
  @ApiOkResponse({ type: ViewsTrainingEntity, isArray: true })
  findAll() {
    return this.viewsTrainingService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ViewsTrainingEntity, isArray: false })
  findOne(@Param('id') id: string) {
    return this.viewsTrainingService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse()
  update(
    @Param('id') id: string,
    @Body() updateViewsTrainingDto: UpdateViewsTrainingDto,
  ) {
    return this.viewsTrainingService.update(+id, updateViewsTrainingDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id') id: string) {
    return this.viewsTrainingService.remove(+id);
  }
}
