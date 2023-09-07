import { Test, TestingModule } from '@nestjs/testing';
import { CsgoStatsService } from './csgo-stats.service';

describe('CsgoStatsService', () => {
  let service: CsgoStatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsgoStatsService],
    }).compile();

    service = module.get<CsgoStatsService>(CsgoStatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
