import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PhotosForPostService } from './photos_for_post.service';
// import { CreatePhotosForPostDto } from './dto/create-photos_for_post.dto';
// import { UpdatePhotosForPostDto } from './dto/update-photos_for_post.dto';
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PhotosForPostEntity } from './entities/photos_for_post.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('photos-for-post')
@ApiTags('photos for post')
export class PhotosForPostController {
  constructor(private readonly photosForPostService: PhotosForPostService) {}

  // @Post()
  // @ApiCreatedResponse({ type: PhotosForPostEntity })
  // create(@Body() createPhotosForPostDto: CreatePhotosForPostDto) {
  //   return this.photosForPostService.create(createPhotosForPostDto);
  // }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        postId: { type: 'integer' },
        userId: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async createUploadFile(@Body('postId') postId: string, @Body('userId') userId: string, @UploadedFile() file: Express.Multer.File) {
    const parsedPostId = parseInt(postId, 10);
    const parsedUserId = parseInt(userId, 10);

    const photo = await this.photosForPostService.create({
      postId: parsedPostId,
      userId: parsedUserId,
      url_image: `http://localhost:3000/uploads/${file.filename}`,
      type: file.mimetype,
      name_image: file.originalname
    });
    
    return {
      photo,
      contentType: file.mimetype  
    };

    // return photo;
  }
  
  
  
  @Get()
  @ApiOkResponse({ type: PhotosForPostEntity, isArray: true })
  findAll() {
    return this.photosForPostService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PhotosForPostEntity })
  findOne(@Param('id') id: string) {
    return this.photosForPostService.findOne(+id);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        postId: { type: 'integer' },
        userId: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @ApiCreatedResponse({ type: PhotosForPostEntity })
  async updateUploadFile(@Param('id') id: string, @Body('postId') postId: string, @Body('userId') userId: string, @UploadedFile() file: Express.Multer.File) {
    const parsedPostId = parseInt(postId, 10);
    const parsedUserId = parseInt(userId, 10);

    const photo = await this.photosForPostService.update(+id, {
      postId: parsedPostId,
      userId: parsedUserId,
      url_image: `http://localhost:3000/uploads/${file.filename}`,
      type: file.mimetype,
      name_image: file.originalname
    });
    
    return {
      photo,
      contentType: file.mimetype  
    };

    // return photo;
  }

  // @ApiCreatedResponse({ type: PhotosForPostEntity })
  // update(@Param('id') id: string, @Body() updatePhotosForPostDto: UpdatePhotosForPostDto) {
  //   return this.photosForPostService.update(+id, updatePhotosForPostDto);
  // }

  @Delete(':id')
  @ApiOkResponse({ type: PhotosForPostEntity })
  remove(@Param('id') id: string) {
    return this.photosForPostService.remove(+id);
  }
}
