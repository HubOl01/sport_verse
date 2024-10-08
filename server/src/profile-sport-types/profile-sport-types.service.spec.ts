import { Test, TestingModule } from '@nestjs/testing';
import { ProfileSportTypesService } from './profile-sport-types.service';

describe('ProfileSportTypesService', () => {
  let service: ProfileSportTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileSportTypesService],
    }).compile();

    service = module.get<ProfileSportTypesService>(ProfileSportTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
