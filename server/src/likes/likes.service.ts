import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikesService {
  constructor (private prisma: PrismaService) {}

  create(createLikeDto: CreateLikeDto) {
    return this.prisma.like_for_post.create({data: createLikeDto})
  }
  
  async getLikesCountForPosts(): Promise<any[]> {
    const likesCounts = await this.prisma.like_for_post.groupBy({
      by: ['postId'],
      _count: {
        idLike: true,
      },
    });
    return likesCounts.map(likeCount => ({
      likesCount: likeCount._count.idLike,
      postId: likeCount.postId,
    }));
  }

  findAll() {
    return this.prisma.like_for_post.findMany()
  }

  findOne(id: number) {
    return this.prisma.like_for_post.findUnique({where: {idLike: id}})
  }

  update(id: number, updateLikeDto: UpdateLikeDto) {
    return `This action updates a #${id} like`;
  }

  remove(id: number) {
    return this.prisma.like_for_post.delete({where: {idLike: id}})
  }
}
