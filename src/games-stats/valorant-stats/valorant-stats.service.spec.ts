import { Test, TestingModule } from '@nestjs/testing';
import { ValorantStatsService } from './valorant-stats.service';

describe('ValorantStatsService', () => {
  let service: ValorantStatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValorantStatsService],
    }).compile();

    service = module.get<ValorantStatsService>(ValorantStatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
