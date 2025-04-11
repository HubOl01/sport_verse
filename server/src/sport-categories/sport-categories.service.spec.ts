import { Test, TestingModule } from '@nestjs/testing';
import { SportCategoriesService } from './sport-categories.service';

describe('SportCategoriesService', () => {
  let service: SportCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SportCategoriesService],
    }).compile();

    service = module.get<SportCategoriesService>(SportCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
