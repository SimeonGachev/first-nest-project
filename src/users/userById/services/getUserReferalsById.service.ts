import { Injectable } from "@nestjs/common";
import { users } from "../../data/users.model";

@Injectable()
export class GetUserReferalsByIdService{
    async getUserReferalsById(id: number): Promise<any[]> {
        return await users.findUserReferalsById(id);
    }
}