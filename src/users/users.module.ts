import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { GamesStatsModule } from 'src/games-stats/games-stats.module';
import { usersProviders } from './users.providers';
import { DatabaseModule } from 'src/database/database.module';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { userDbSchema } from './schemas/user.schema';

@Module({
  imports: [
    DatabaseModule,
    GamesStatsModule,
    // MongooseModule.forFeature([{ name: 'User', schema: userDbSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService, DatabaseModule, ...usersProviders],
})
export class UsersModule {}
