import { Test, TestingModule } from '@nestjs/testing';
import { FortniteStatsService } from './fortnite-stats.service';

describe('FortniteStatsService', () => {
  let service: FortniteStatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FortniteStatsService],
    }).compile();

    service = module.get<FortniteStatsService>(FortniteStatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
