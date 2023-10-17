import { Document } from 'mongoose';
import { CompetitionStatus } from '../dto/CompetitionDto';

export interface Competition extends Document {
  readonly organiser: string;
  readonly name: string;
  readonly createdOn: number;
  readonly modifiedOn: number;
  readonly partitipants: Array<string>;
  readonly scores: any;
  readonly status: CompetitionStatus;
}
