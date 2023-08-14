import { Module } from '@nestjs/common';
import { UserbyIdController } from './userById.controller';
import { GetUserById } from './services/getUserById';
import { GetUserStats } from './services/getUserStats';

@Module({
  imports: [],
  controllers: [ UserbyIdController ],
  providers: [ GetUserById, GetUserStats ],
})
export class UserByIdModule {}
