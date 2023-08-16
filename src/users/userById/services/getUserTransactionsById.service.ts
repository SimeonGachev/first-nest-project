import { Injectable } from "@nestjs/common";
import { users } from "../../data/users.model";

@Injectable()
export class GetUserTransactionsByIdService{
    async getUserTransactionsById(id: number): Promise<any> {
        return await users.findUserTransactionsById(id);
    }
}