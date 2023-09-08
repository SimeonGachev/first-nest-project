import { Test, TestingModule } from '@nestjs/testing';
import { LolStatsService } from './lol-stats.service';

describe('LolStatsService', () => {
  let service: LolStatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LolStatsService],
    }).compile();

    service = module.get<LolStatsService>(LolStatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
