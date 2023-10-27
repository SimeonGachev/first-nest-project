import { Model, Mongoose } from 'mongoose';
import { CompetitionDbSchema } from './schemas/competition.schema';
import { User } from 'src/users/interfaces/user.inteface';

export const competitionsProviders = [
  {
    provide: 'COMPETITION_MODEL',
    useFactory: (mongoose: Mongoose, userModel: Model<User>) => {
      const schema = CompetitionDbSchema;
      schema.pre('updateMany', async function () {
        const { _id: competitionId, partitipants } = await this.model.findOne(
          this.getQuery(),
        );
        partitipants.forEach(async (partitipantId) => {
          await userModel
            .updateMany(
              { _id: partitipantId },
              {
                $set: {
                  stats: { wins: 1, bestScore: 2, history: [competitionId] },
                  modifiedOn: Date.now(),
                },
              },
            )
            .exec();
          console.log(await userModel.findById(partitipantId).exec());
        });
      });

      return mongoose.model('Competition', schema);
    },
    inject: ['DATABASE_CONNECTION', 'USER_MODEL'],
  },
];
