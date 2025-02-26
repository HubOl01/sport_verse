import { Test, TestingModule } from '@nestjs/testing';
import { ViewsTrainingService } from './views-training.service';

describe('ViewsTrainingService', () => {
  let service: ViewsTrainingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ViewsTrainingService],
    }).compile();

    service = module.get<ViewsTrainingService>(ViewsTrainingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
