import { Test, TestingModule } from '@nestjs/testing';
import { StatusesTrainingService } from './statuses-training.service';

describe('StatusesTrainingService', () => {
  let service: StatusesTrainingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusesTrainingService],
    }).compile();

    service = module.get<StatusesTrainingService>(StatusesTrainingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
