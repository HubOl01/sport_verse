import { Test, TestingModule } from '@nestjs/testing';
import { CommentTrainingService } from './comment-training.service';

describe('СommentTrainingService', () => {
  let service: CommentTrainingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentTrainingService],
    }).compile();

    service = module.get<CommentTrainingService>(CommentTrainingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
