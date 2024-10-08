import { Test, TestingModule } from '@nestjs/testing';
import { SportTypesController } from './sport-types.controller';
import { SportTypesService } from './sport-types.service';

describe('SportTypesController', () => {
  let controller: SportTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SportTypesController],
      providers: [SportTypesService],
    }).compile();

    controller = module.get<SportTypesController>(SportTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
