import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { PhotosForPostModule } from './photos_for_post/photos_for_post.module';
// import { MulterModule } from '@nestjs/platform-express';

@Module({
  
  imports: [PrismaModule, UsersModule, PostsModule, PhotosForPostModule, 
   ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
