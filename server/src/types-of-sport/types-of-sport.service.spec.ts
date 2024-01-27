import { Test, TestingModule } from '@nestjs/testing';
import { TypesOfSportService } from './types-of-sport.service';

describe('TypesOfSportService', () => {
  let service: TypesOfSportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypesOfSportService],
    }).compile();

    service = module.get<TypesOfSportService>(TypesOfSportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
