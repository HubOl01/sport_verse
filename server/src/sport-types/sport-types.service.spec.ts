import { Test, TestingModule } from '@nestjs/testing';
import { SportTypesService } from './sport-types.service';

describe('SportTypesService', () => {
  let service: SportTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SportTypesService],
    }).compile();

    service = module.get<SportTypesService>(SportTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
