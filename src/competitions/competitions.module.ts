import { Module } from '@nestjs/common';
import { CompetitionsController } from './competitions.controller';
import { CompetitionsService } from './competitions.service';
import { competitionsProviders } from './competitions.providers';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [CompetitionsController],
  providers: [CompetitionsService, ...competitionsProviders],
})
export class CompetitionsModule {}
