import { Test, TestingModule } from '@nestjs/testing';
import { СommentTrainingController } from './сomment-training.controller';
import { СommentTrainingService } from './сomment-training.service';

describe('СommentTrainingController', () => {
  let controller: СommentTrainingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [СommentTrainingController],
      providers: [СommentTrainingService],
    }).compile();

    controller = module.get<СommentTrainingController>(СommentTrainingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
