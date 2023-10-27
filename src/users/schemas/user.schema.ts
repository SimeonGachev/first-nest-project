import * as mongoose from 'mongoose';
import { Role } from '../../enums/role.enum';
import { Tier } from '../../enums/tier.enum';

const statsSchema = new mongoose.Schema({
  wins: { type: Number, default: 0 },
  bestScore: { type: Number, default: 0 },
  history: {
    type: Array<mongoose.Schema.Types.ObjectId>,
    ref: 'Competition',
    default: [],
  },
});

export const userDbSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  stats: { type: statsSchema, default: {} },
  roles: { type: String, enum: Object.values(Role), default: Role.User },
  tier: { type: String, enum: Object.values(Tier), default: Tier.Tier1 },
  referals: [
    { type: Array<mongoose.Schema.Types.ObjectId>, ref: 'User', default: [] },
  ],
  transactions: [
    { type: Array<mongoose.Schema.Types.ObjectId>, ref: 'User', default: [] },
  ],
});
