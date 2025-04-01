import { Injectable } from '@nestjs/common';
import { CreateCommentTrainingDto } from './dto/create-comment-training.dto';
import { UpdateCommentTrainingDto } from './dto/update-comment-training.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentTrainingService {
  constructor(private prisma: PrismaService) {}
  create(createCommentTrainingDto: CreateCommentTrainingDto) {
    return this.prisma.commentTraining.create({
      data: createCommentTrainingDto,
    });
  }

  findAll() {
    return this.prisma.commentTraining.findMany({
      include: {
        user: true,
        replies: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.commentTraining.findUnique({
      where: { id },
      include: {
        user: true,
        replies: true,
      },
    });
  }

  update(id: number, updateCommentTrainingDto: UpdateCommentTrainingDto) {
    return this.prisma.commentTraining.update({
      where: { id },
      data: updateCommentTrainingDto,
    });
  }

  remove(id: number) {
    return this.prisma.commentTraining.delete({ where: { id } });
  }
}
