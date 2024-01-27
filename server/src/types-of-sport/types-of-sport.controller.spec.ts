import { Test, TestingModule } from '@nestjs/testing';
import { TypesOfSportController } from './types-of-sport.controller';
import { TypesOfSportService } from './types-of-sport.service';

describe('TypesOfSportController', () => {
  let controller: TypesOfSportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypesOfSportController],
      providers: [TypesOfSportService],
    }).compile();

    controller = module.get<TypesOfSportController>(TypesOfSportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
