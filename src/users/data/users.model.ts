import { CreateUserDto } from "../dto/createUserDto";

export class UsersModel{
    constructor( private users: any[] ){}

    getAllUsers() {
        return this.users
    }

    findUserById(targetId: number){
        return this.users.find(({ id }: CreateUserDto) => id == targetId)
    }

    findUserStatsById(targetId: number){
        return this.users.find(({ id }: CreateUserDto) => id == targetId).stats
    }

    findUserReferalsById(targetId: number){
        return this.users.find(({ id }: CreateUserDto) => id == targetId).referals
    }

    findUserTransactionsById(targetId: number){
        return this.users.find(({ id }: CreateUserDto) => id == targetId).transactions
    }

    addUser(username: string) {
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