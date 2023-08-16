import { Injectable } from "@nestjs/common";
import { users } from "../data/users.model";

@Injectable()
export class GetAllUsersService{
    async getAllUsers(): Promise<any> {
        return await users.getAllUsers();
    }
}