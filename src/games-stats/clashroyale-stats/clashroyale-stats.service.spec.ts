import { Test, TestingModule } from '@nestjs/testing';
import { ClashroyaleStatsService } from './clashroyale-stats.service';

describe('ClashroyaleStatsService', () => {
  let service: ClashroyaleStatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClashroyaleStatsService],
    }).compile();

    service = module.get<ClashroyaleStatsService>(ClashroyaleStatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
