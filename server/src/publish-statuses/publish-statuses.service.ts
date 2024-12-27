import { Injectable } from '@nestjs/common';
import { CreatePublishStatusDto } from './dto/create-publish-status.dto';
import { UpdatePublishStatusDto } from './dto/update-publish-status.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PublishStatusesService {
  constructor(private prisma: PrismaService) {}
  findAll() {
    return this.prisma.statusPublish.findMany();
  }
}
