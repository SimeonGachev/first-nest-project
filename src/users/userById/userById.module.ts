import { Module } from '@nestjs/common';
import { UserbyIdController } from './userById.controller';
import { GetUserByIdService } from './services/getUserById.service';
import { GetUserStatsByIdService } from './services/getUserStatsById.service';
import { GetUserReferalsByIdService } from './services/getUserReferalsById.service';
import { GetUserTransactionsByIdService } from './services/getUserTransactionsById.service';

@Module({
  imports: [],
  controllers: [ UserbyIdController ],
  providers: [ 
    GetUserByIdService, 
    GetUserStatsByIdService,
    GetUserReferalsByIdService,
    GetUserTransactionsByIdService
  ],
})
export class UserByIdModule {}
