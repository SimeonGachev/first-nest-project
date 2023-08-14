import { Injectable } from "@nestjs/common/decorators/core";

@Injectable()
export class AddUserService{
    add(userInfo: any){
        return `added user ${userInfo}`;
    }
}