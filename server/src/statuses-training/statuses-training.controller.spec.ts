import { Test, TestingModule } from '@nestjs/testing';
import { StatusesTrainingController } from './statuses-training.controller';
import { StatusesTrainingService } from './statuses-training.service';

describe('StatusesTrainingController', () => {
  let controller: StatusesTrainingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusesTrainingController],
      providers: [StatusesTrainingService],
    }).compile();

    controller = module.get<StatusesTrainingController>(StatusesTrainingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
