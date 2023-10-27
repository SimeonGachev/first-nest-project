import { Mongoose } from 'mongoose';
import { userDbSchema } from './schemas/user.schema';

export const usersProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('User', userDbSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
