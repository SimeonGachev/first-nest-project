import { Body, Controller, Get, Post } from "@nestjs/common";
import { GetAllUsersService } from "./services/getAllUsers.service";
import { AddUserService } from "./services/addUser.service";

@Controller("users")
export class UsersController {
    constructor(
        private readonly getAllUsersService: GetAllUsersService,
        private readonly addUserService: AddUserService,
    ) {}

    @Get()
    async getAllUsers(): Promise<string> {
        return await this.getAllUsersService.getAllUsers();
    }

    @Post("register")
    async addUser(@Body() { username }: { username: string; }): Promise<any> {
        return await this.addUserService.add( username );
    }

}