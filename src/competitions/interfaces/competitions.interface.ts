import { Document } from 'mongoose';
import { CompetitionStatus } from '../dto/CompetitionDto';

export interface Competition extends Document {
  readonly id: string;
  readonly organiser: string;
  readonly name: string;
  readonly createdOn: string;
  readonly modifiedOn: string;
  readonly partitipants: Array<string>;
  readonly scores: any;
  readonly status: CompetitionStatus;
}
