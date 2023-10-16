import { Mongoose } from 'mongoose';
import { CompetitionDbSchema } from './schemas/competition.schema';

export const competitionsProviders = [
  {
    provide: 'COMPETITION_MODEL',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('Competition', CompetitionDbSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
