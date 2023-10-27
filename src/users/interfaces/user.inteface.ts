import { Document, Types } from 'mongoose';
import { Role } from '../../enums/role.enum';
import { Tier } from '../../enums/tier.enum';
import { CreateStatsDto } from '../dto/statsDto';

export class User extends Document {
  readonly username: string;
  readonly password: string;
  readonly stats: CreateStatsDto;
  readonly roles: Role;
  readonly tier: Tier;
  readonly referals: Array<Types.ObjectId>;
  readonly transactions: Array<Types.ObjectId>;
}