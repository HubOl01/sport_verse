import { Test, TestingModule } from '@nestjs/testing';
import { CommentTrainingController } from './comment-training.controller';
import { CommentTrainingService } from './comment-training.service';

describe('СommentTrainingController', () => {
  let controller: CommentTrainingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentTrainingController],
      providers: [CommentTrainingService],
    }).compile();

    controller = module.get<CommentTrainingController>(
      CommentTrainingController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
