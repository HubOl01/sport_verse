import { Test, TestingModule } from '@nestjs/testing';
import { PlanInGroupsController } from './plan-in-groups.controller';
import { PlanInGroupsService } from './plan-in-groups.service';

describe('PlanInGroupsController', () => {
  let controller: PlanInGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanInGroupsController],
      providers: [PlanInGroupsService],
    }).compile();

    controller = module.get<PlanInGroupsController>(PlanInGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
