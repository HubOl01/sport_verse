import { Test, TestingModule } from '@nestjs/testing';
import { ProfileSportTypesController } from './profile-sport-types.controller';
import { ProfileSportTypesService } from './profile-sport-types.service';

describe('ProfileSportTypesController', () => {
  let controller: ProfileSportTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileSportTypesController],
      providers: [ProfileSportTypesService],
    }).compile();

    controller = module.get<ProfileSportTypesController>(ProfileSportTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
