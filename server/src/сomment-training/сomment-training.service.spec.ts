import { Test, TestingModule } from '@nestjs/testing';
import { СommentTrainingService } from './сomment-training.service';

describe('СommentTrainingService', () => {
  let service: СommentTrainingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [СommentTrainingService],
    }).compile();

    service = module.get<СommentTrainingService>(СommentTrainingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
