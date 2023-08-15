import { Controller, Get, Param } from "@nestjs/common";
import { GetUserByIdService } from "./services/getUserById.service";
import { GetUserStatsByIdService } from "./services/getUserStatsById.service";
import { GetUserReferalsByIdService } from "./services/getUserReferalsById.service";
import { GetUserTransactionsByIdService } from "./services/getUserTransactionsById.service";

@Controller("users/:id")
export class UserbyIdController{
    constructor(
        private readonly getUserById: GetUserByIdService,
        private readonly getUserStats: GetUserStatsByIdService,
        private readonly getUserReferals: GetUserReferalsByIdService,
        private readonly getUserTransactions: GetUserTransactionsByIdService,
    ) {}

    @Get()
    getUser(@Param("id") id: number){
        return this.getUserById.getUserById( id );
    }

    @Get("stats")
    getStats(@Param("id") id: number){
        return this.getUserStats.getUserStatsById( id );
    }

    @Get("referals")
    getReferals(@Param("id") id: number){
        return this.getUserReferals.getUserReferalsById( id );
    }

    @Get("transactions")
    getTransactions(@Param("id") id: number){
        return this.getUserTransactions.getUserTransactionsById( id );
    }

}