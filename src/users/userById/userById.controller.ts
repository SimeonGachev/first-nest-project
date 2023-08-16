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
    async getUser(@Param("id") id: number): Promise<any> {
        return await this.getUserById.getUserById( id );
    }

    @Get("stats")
    async getStats(@Param("id") id: number): Promise<any> {
        return await this.getUserStats.getUserStatsById( id );
    }

    @Get("referals")
    async getReferals(@Param("id") id: number): Promise<any> {
        return await this.getUserReferals.getUserReferalsById( id );
    }

    @Get("transactions")
    async getTransactions(@Param("id") id: number): Promise<any> {
        return await this.getUserTransactions.getUserTransactionsById( id );
    }

}