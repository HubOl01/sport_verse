import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseCategoriesController } from './exercise-categories.controller';
import { ExerciseCategoriesService } from './exercise-categories.service';

describe('ExerciseCategoriesController', () => {
  let controller: ExerciseCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseCategoriesController],
      providers: [ExerciseCategoriesService],
    }).compile();

    controller = module.get<ExerciseCategoriesController>(ExerciseCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
