import { Controller, Get, Param } from "@nestjs/common";
import { GetUserById } from "./services/getUserById";
import { GetUserStats } from "./services/getUserStats";

@Controller("users/:id")
export class UserbyIdController{
    constructor(
        private readonly getUserById: GetUserById,
        private readonly getUserStats: GetUserStats,
    ) {}

    @Get()
    getUser(@Param("id") id: string){
        return this.getUserById.get( id )
    }

    @Get("stats")
    getStats(@Param("id") id: string){
        return this.getUserStats.get( id )
    }
}