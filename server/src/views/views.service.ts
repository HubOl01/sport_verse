import { Injectable } from '@nestjs/common';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/update-view.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { View_for_post } from '@prisma/client';

@Injectable()
export class ViewsService {
  constructor(private prisma: PrismaService) {}

  create(createViewDto: CreateViewDto) {
    return this.prisma.view_for_post.create({data: createViewDto})
  }
  async getViewsCountForPosts(): Promise<any[]> {
    const viewsCounts = await this.prisma.view_for_post.groupBy({
      by: ['postId'],
      _count: {
        idView: true,
      },
    });
    return viewsCounts.map(viewsCount => ({
      viewsCount: viewsCount._count.idView,
      postId: viewsCount.postId,
    }));
  }

  findAll() {
    return this.prisma.view_for_post.findMany()
  }

  findOne(id: number) {
    return this.prisma.view_for_post.findUnique({where: {idView: id}})
  }

  update(id: number, updateViewDto: UpdateViewDto) {
    return `This action updates a #${id} view`;
  }

  remove(id: number) {
    return this.prisma.view_for_post.delete({where: {idView: id}})
  }
}
