import { Test, TestingModule } from '@nestjs/testing';
import { PhotosForPostService } from './photos_for_post.service';

describe('PhotosForPostService', () => {
  let service: PhotosForPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhotosForPostService],
    }).compile();

    service = module.get<PhotosForPostService>(PhotosForPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
