import { Module } from '@nestjs/common';
import { PhotosForPostService } from './photos_for_post.service';
import { PhotosForPostController } from './photos_for_post.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [PhotosForPostController],
  providers: [PhotosForPostService],
  imports: [PrismaModule, 
    MulterModule.register({
      dest: './uploads',
      fileFilter: (req, file, callback) => {
        const fileType = file.mimetype.split('/')[0];
        let folder: string = './uploads/others';

        if (fileType === 'image') {
          folder = './uploads/photos';
        } else if (fileType === 'video') {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          folder = './uploads/videos';
        } 
        callback(null, true);
      },
    })]
})
export class PhotosForPostModule {}
