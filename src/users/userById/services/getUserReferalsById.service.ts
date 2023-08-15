import { Injectable } from "@nestjs/common";
import { users } from "../../data/users.model";

@Injectable()
export class GetUserReferalsByIdService{
    getUserReferalsById(id: number): any {
        return users.findUserReferalsById(id);
    }
}