import { Injectable } from "@nestjs/common";
import { users } from "../../data/users.model";

@Injectable()
export class GetUserStatsByIdService{
    getUserStatsById(id: number): any {
        return users.findUserStatsById(id);
    }
}