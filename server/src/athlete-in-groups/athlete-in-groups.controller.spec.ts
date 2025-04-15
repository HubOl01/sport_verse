import { Test, TestingModule } from '@nestjs/testing';
import { AthleteInGroupsController } from './athlete-in-groups.controller';
import { AthleteInGroupsService } from './athlete-in-groups.service';

describe('AthleteInGroupsController', () => {
  let controller: AthleteInGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AthleteInGroupsController],
      providers: [AthleteInGroupsService],
    }).compile();

    controller = module.get<AthleteInGroupsController>(AthleteInGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
