import { Test, TestingModule } from '@nestjs/testing';
import { PlanInGroupsService } from './plan-in-groups.service';

describe('PlanInGroupsService', () => {
  let service: PlanInGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanInGroupsService],
    }).compile();

    service = module.get<PlanInGroupsService>(PlanInGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
