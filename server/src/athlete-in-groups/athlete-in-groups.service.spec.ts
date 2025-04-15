import { Test, TestingModule } from '@nestjs/testing';
import { AthleteInGroupsService } from './athlete-in-groups.service';

describe('AthleteInGroupsService', () => {
  let service: AthleteInGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AthleteInGroupsService],
    }).compile();

    service = module.get<AthleteInGroupsService>(AthleteInGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
