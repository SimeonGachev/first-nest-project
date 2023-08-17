import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import {
  GetAllUsersService,
  GetUserByIdService,
  GetUserReferalsByIdService,
  GetUserStatsByIdService,
  GetUserTransactionsByIdService,
  AddUserService,
} from './users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    GetAllUsersService,
    AddUserService,
    GetUserReferalsByIdService,
    GetUserStatsByIdService,
    GetUserTransactionsByIdService,
    GetUserByIdService,
  ],
  exports: [],
})
export class UsersModule {}
