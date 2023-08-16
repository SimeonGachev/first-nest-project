import { Injectable } from "@nestjs/common/decorators/core";
import { users } from "../data/users.model";

@Injectable()
export class AddUserService{
    async add( username: string ){
        return await users.addUser( username );
    }
}