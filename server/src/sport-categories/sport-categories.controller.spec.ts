import { Test, TestingModule } from '@nestjs/testing';
import { SportCategoriesController } from './sport-categories.controller';
import { SportCategoriesService } from './sport-categories.service';

describe('SportCategoriesController', () => {
  let controller: SportCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SportCategoriesController],
      providers: [SportCategoriesService],
    }).compile();

    controller = module.get<SportCategoriesController>(SportCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
