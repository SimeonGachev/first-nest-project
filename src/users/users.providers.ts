import { Mongoose } from 'mongoose';
import { userDbSchema } from './schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose/dist/common';

export const usersProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('User', userDbSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
