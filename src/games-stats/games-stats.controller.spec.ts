import { Test, TestingModule } from '@nestjs/testing';
import { GamesStatsController } from './games-stats.controller';

describe('GamesStatsController', () => {
  let controller: GamesStatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamesStatsController],
    }).compile();

    controller = module.get<GamesStatsController>(GamesStatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
