import { Test, TestingModule } from '@nestjs/testing';
import { LikeTrainingService } from './like-training.service';

describe('LikeTrainingService', () => {
  let service: LikeTrainingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikeTrainingService],
    }).compile();

    service = module.get<LikeTrainingService>(LikeTrainingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
