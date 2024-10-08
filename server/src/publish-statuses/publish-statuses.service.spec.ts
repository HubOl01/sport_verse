import { Test, TestingModule } from '@nestjs/testing';
import { PublishStatusesService } from './publish-statuses.service';

describe('PublishStatusesService', () => {
  let service: PublishStatusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublishStatusesService],
    }).compile();

    service = module.get<PublishStatusesService>(PublishStatusesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
