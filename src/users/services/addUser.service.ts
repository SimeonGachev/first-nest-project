import { Injectable } from "@nestjs/common/decorators/core";
import { users } from "../data/users.model";

@Injectable()
export class AddUserService{
    add( username: string ){
        return users.addUser( username );
    }
}