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
    getAllUsers(): string{
        return this.getAllUsersService.getAllUsers();
    }

    @Post("register")
    addUser(@Body() { username }: { username: string; }): any{
        return this.addUserService.add( username );
    }

}