import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PhotosForPostService } from './photos_for_post.service';
import { CreatePhotosForPostDto } from './dto/create-photos_for_post.dto';
import { UpdatePhotosForPostDto } from './dto/update-photos_for_post.dto';
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { PhotosForPostEntity } from './entities/photos_for_post.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('photos-for-post')
@ApiTags('photos for post')
export class PhotosForPostController {
  constructor(private readonly photosForPostService: PhotosForPostService) {}

  @Post()
  @ApiCreatedResponse({ type: PhotosForPostEntity })
  create(@Body() createPhotosForPostDto: CreatePhotosForPostDto) {
    return this.photosForPostService.create(createPhotosForPostDto);
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        postId: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Body('postId') postId: string, @UploadedFile() file: Express.Multer.File) {
    const parsedPostId = parseInt(postId, 10);
    // const photo = await this.photosForPostService.create({
    //   postId: parsedPostId,
    //   url_image: `http://localhost:3000/uploads/${file.filename}`  // полный путь к файлу
    // });
    const photo = await this.photosForPostService.create({
      postId: parsedPostId,
      url_image: `http://localhost:3000/uploads/${file.filename}`,
      type: file.mimetype,
      name_image: file.originalname // полный путь к файлу
    });
    
    return {
      photo,
      contentType: file.mimetype  // добавим MIME-тип в ответ
    };

    // return photo;
  }
  
  
  
  @Get()
  @ApiCreatedResponse({ type: PhotosForPostEntity, isArray: true })
  findAll() {
    return this.photosForPostService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: PhotosForPostEntity })
  findOne(@Param('id') id: string) {
    return this.photosForPostService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: PhotosForPostEntity })
  update(@Param('id') id: string, @Body() updatePhotosForPostDto: UpdatePhotosForPostDto) {
    return this.photosForPostService.update(+id, updatePhotosForPostDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: PhotosForPostEntity })
  remove(@Param('id') id: string) {
    return this.photosForPostService.remove(+id);
  }
}
