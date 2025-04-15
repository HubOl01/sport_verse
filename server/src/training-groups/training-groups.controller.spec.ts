import { Test, TestingModule } from '@nestjs/testing';
import { TrainingGroupsController } from './training-groups.controller';
import { TrainingGroupsService } from './training-groups.service';

describe('TrainingGroupsController', () => {
  let controller: TrainingGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingGroupsController],
      providers: [TrainingGroupsService],
    }).compile();

    controller = module.get<TrainingGroupsController>(TrainingGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
