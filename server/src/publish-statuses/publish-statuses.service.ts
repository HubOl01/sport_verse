import { Injectable } from '@nestjs/common';
import { CreatePublishStatusDto } from './dto/create-publish-status.dto';
import { UpdatePublishStatusDto } from './dto/update-publish-status.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PublishStatusesService {
  constructor(private prisma: PrismaService) {}
  // create(createPublishStatusDto: CreatePublishStatusDto) {
  //   return this.prisma.statusPublish.;
  // }

  findAll() {
    return this.prisma.statusPublish.findMany();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} publishStatus`;
  // }

  // update(id: number, updatePublishStatusDto: UpdatePublishStatusDto) {
  //   return `This action updates a #${id} publishStatus`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} publishStatus`;
  // }
}
