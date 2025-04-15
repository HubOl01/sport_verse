import { Test, TestingModule } from '@nestjs/testing';
import { TrainingGroupsService } from './training-groups.service';

describe('TrainingGroupsService', () => {
  let service: TrainingGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingGroupsService],
    }).compile();

    service = module.get<TrainingGroupsService>(TrainingGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
