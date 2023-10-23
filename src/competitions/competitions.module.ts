import { Module } from '@nestjs/common';
import { CompetitionsController } from './competitions.controller';
import { CompetitionsService } from './competitions.service';
import { competitionsProviders } from './competitions.providers';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { CompetitionDbSchema } from './schemas/competition.schema';
import { CompetitionDto } from './dto/CompetitionDto';
import { Model } from 'mongoose';
import { User } from 'src/users/interfaces/user.inteface';
import { usersProviders } from 'src/users/users.providers';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    // MongooseModule.forFeatureAsync([
    //   {
    //     name: CompetitionDto.name,
    //     useFactory: (userModel: Model<User>) => {
    //       const schema = CompetitionDbSchema;
    //       schema.pre('updateMany', async function () {
    //         const competition = await this.model.findOne(this.getQuery());
    //         const id = competition.partitipants[0];
    //         console.log(userModel);
    //       });
    //       return schema;
    //     },
    //     inject: [getModelToken('User')],
    //   },
    // ]),
  ],
  controllers: [CompetitionsController],
  providers: [CompetitionsService, ...competitionsProviders],
})
export class CompetitionsModule {}
