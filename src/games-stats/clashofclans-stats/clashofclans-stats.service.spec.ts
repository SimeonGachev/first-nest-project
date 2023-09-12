import { Test, TestingModule } from '@nestjs/testing';
import { ClashofclansStatsService } from './clashofclans-stats.service';

describe('ClashofclansStatsService', () => {
  let service: ClashofclansStatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClashofclansStatsService],
    }).compile();

    service = module.get<ClashofclansStatsService>(ClashofclansStatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
