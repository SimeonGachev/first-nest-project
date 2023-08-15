import { Injectable } from "@nestjs/common";
import { users } from "../../data/users.model";

@Injectable()
export class GetUserByIdService{
    getUserById(id: number): any {
        return users.findUserById(id);
    }
}