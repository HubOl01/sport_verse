import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { PhotosForPostModule } from './photos_for_post/photos_for_post.module';
// import { MulterModule } from '@nestjs/platform-express';
import { LikesModule } from './likes/likes.module';
import { ViewsModule } from './views/views.module';
import { ProfilesModule } from './profiles/profiles.module';
import { CategoriesModule } from './categories/categories.module';
import { TypesOfSportModule } from './types-of-sport/types-of-sport.module';

@Module({
  
  imports: [PrismaModule, UsersModule, PostsModule, PhotosForPostModule, LikesModule, ViewsModule, ProfilesModule, CategoriesModule, TypesOfSportModule, 
   ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
