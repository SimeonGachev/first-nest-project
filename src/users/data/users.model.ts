import { CreateUserDto } from "../dto/createUserDto";
import { BadRequestException, NotFoundException } from "@nestjs/common/exceptions";

export class UsersModel{
    constructor( private users: any[] ){}

    async getAllUsers() {
        return this.users
    }

    async findUserById(targetId: number){
        const user = this.users.find(({ id }: CreateUserDto) => id == targetId);

        if(!user) throw new NotFoundException("User not found");

        return user;
    }

    async findUserStatsById(targetId: number){
        const user = this.users.find(({ id }: CreateUserDto) => id == targetId);

        if(!user) throw new NotFoundException("User not found");

        return user.stats;
    }

    async findUserReferalsById(targetId: number){
        const user = this.users.find(({ id }: CreateUserDto) => id == targetId);

        if(!user) throw new NotFoundException("User not found");

        return user.referals;
    }

    async findUserTransactionsById(targetId: number){
        const user = this.users.find(({ id }: CreateUserDto) => id == targetId);

        if(!user) throw new NotFoundException("User not found");

        return user.transactions;
    }

    async addUser(username: string) {
        if( !username ) throw new BadRequestException("Username must be provided");

        const user = {
            id: this.users.length+1,
            username: username,
            stats: {},
            referals: [],
            transactions: [],
        }

        this.users.push(user)

        return user
    }

} 

export const users = new UsersModel([
{
    id: 1,
    username: "username",
    stats: {},
    referals: [],
    transactions: [],
},
{
    id: 2,
    username: "bighot",
    stats: {},
    referals: [],
    transactions: [],
}
]);