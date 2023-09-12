import { Test, TestingModule } from '@nestjs/testing';
import { BrawlstarsStatsService } from './brawlstars-stats.service';

describe('BrawlstarsStatsService', () => {
  let service: BrawlstarsStatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrawlstarsStatsService],
    }).compile();

    service = module.get<BrawlstarsStatsService>(BrawlstarsStatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
