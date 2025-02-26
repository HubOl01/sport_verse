import { Test, TestingModule } from '@nestjs/testing';
import { LikeTrainingController } from './like-training.controller';
import { LikeTrainingService } from './like-training.service';

describe('LikeTrainingController', () => {
  let controller: LikeTrainingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikeTrainingController],
      providers: [LikeTrainingService],
    }).compile();

    controller = module.get<LikeTrainingController>(LikeTrainingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
