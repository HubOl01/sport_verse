import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseCategoriesService } from './exercise-categories.service';

describe('ExerciseCategoriesService', () => {
  let service: ExerciseCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseCategoriesService],
    }).compile();

    service = module.get<ExerciseCategoriesService>(ExerciseCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
