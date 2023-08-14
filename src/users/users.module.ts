import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { GetAllUsersService } from './services/getAllUsers.service';
import { AddUserService } from './services/addUser.service';
import { UserByIdModule } from './userById/userById.module';

@Module({
  imports: [ UserByIdModule ],
  controllers: [ UsersController ],
  providers: [ GetAllUsersService, AddUserService ],
})
export class UsersModule {}
