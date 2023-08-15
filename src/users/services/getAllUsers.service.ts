import { Injectable } from "@nestjs/common";
import { users } from "../data/users.model";

@Injectable()
export class GetAllUsersService{
    getAllUsers(): any {
        return users.getAllUsers();
    }
}