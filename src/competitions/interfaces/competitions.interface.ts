import { Document } from 'mongoose';
import { CompetitionStatus } from '../dto/CompetitionDto';

export interface Competition extends Document {
  organiser: string;
  name: string;
  createdOn: number;
  modifiedOn: number;
  partitipants: Array<string>;
  scores: any;
  status: CompetitionStatus;
}
