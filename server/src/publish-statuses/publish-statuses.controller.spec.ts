import { Test, TestingModule } from '@nestjs/testing';
import { PublishStatusesController } from './publish-statuses.controller';
import { PublishStatusesService } from './publish-statuses.service';

describe('PublishStatusesController', () => {
  let controller: PublishStatusesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublishStatusesController],
      providers: [PublishStatusesService],
    }).compile();

    controller = module.get<PublishStatusesController>(PublishStatusesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
