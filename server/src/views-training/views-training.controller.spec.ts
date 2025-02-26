import { Test, TestingModule } from '@nestjs/testing';
import { ViewsTrainingController } from './views-training.controller';
import { ViewsTrainingService } from './views-training.service';

describe('ViewsTrainingController', () => {
  let controller: ViewsTrainingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ViewsTrainingController],
      providers: [ViewsTrainingService],
    }).compile();

    controller = module.get<ViewsTrainingController>(ViewsTrainingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
