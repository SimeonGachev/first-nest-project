import { Injectable } from "@nestjs/common";
import { users } from "../../data/users.model";

@Injectable()
export class GetUserStatsByIdService{
    async getUserStatsById(id: number): Promise<any> {
        return await users.findUserStatsById(id);
    }
}