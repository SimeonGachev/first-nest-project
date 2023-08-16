import { Injectable } from "@nestjs/common";
import { users } from "../../data/users.model";

@Injectable()
export class GetUserByIdService{
    async getUserById(id: number): Promise<any> {
        return await users.findUserById(id);
    }
}