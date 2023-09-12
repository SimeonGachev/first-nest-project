import { Test, TestingModule } from '@nestjs/testing';
import { Dota2StatsService } from './dota2-stats.service';

describe('Dota2StatsService', () => {
  let service: Dota2StatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Dota2StatsService],
    }).compile();

    service = module.get<Dota2StatsService>(Dota2StatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
