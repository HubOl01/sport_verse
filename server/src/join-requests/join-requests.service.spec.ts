import { Test, TestingModule } from '@nestjs/testing';
import { JoinRequestsService } from './join-requests.service';

describe('JoinRequestsService', () => {
  let service: JoinRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JoinRequestsService],
    }).compile();

    service = module.get<JoinRequestsService>(JoinRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
