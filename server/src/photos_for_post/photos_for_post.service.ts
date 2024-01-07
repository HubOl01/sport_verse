import { Injectable } from '@nestjs/common';
import { CreatePhotosForPostDto } from './dto/create-photos_for_post.dto';
import { UpdatePhotosForPostDto } from './dto/update-photos_for_post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PhotosForPostService {
  constructor(private prisma: PrismaService) {}

  create(createPhotosForPostDto: CreatePhotosForPostDto) {
    return this.prisma.photo_for_post.create({ data: createPhotosForPostDto });
  }
  
  // async createUpload(data: Partial<Photo_for_post>): Promise<Photo_for_post> {
  //   const photo = this.prisma.photo_for_post.create(data);
  //   return await this.prismaphoto_for_post.save(photo);
  // }

  findAll() {
    return this.prisma.photo_for_post.findMany();
  }

  findOne(id: number) {
    return this.prisma.photo_for_post.findUnique({
      where: { idPhoto: id },
    });
  }

  update(id: number, updatePhotosForPostDto: UpdatePhotosForPostDto) {
    return this.prisma.photo_for_post.update({
      where: { idPhoto: id },
      data: updatePhotosForPostDto,
    });
  }

  remove(id: number) {
    return this.prisma.photo_for_post.delete({
      where: { idPhoto: id },
    });
  }
}
