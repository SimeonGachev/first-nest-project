import { Injectable } from "@nestjs/common";
import { users } from "../../data/users.model";

@Injectable()
export class GetUserTransactionsByIdService{
    getUserTransactionsById(id: number): any {
        return users.findUserTransactionsById(id);
    }
}