import { Injectable } from "@nestjs/common";

@Injectable()
export class GetAllUsersService{
    getAllUsers(): string {
        return "all Users"
    }
}