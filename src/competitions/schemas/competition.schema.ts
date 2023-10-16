import * as mongoose from 'mongoose';

export enum CompetitionStatus {
  Open = 'Open',
  Closed = 'Closed',
}

export const CompetitionDbSchema = new mongoose.Schema({
  id: String,
  organiser: String,
  name: String,
  createdOn: String,
  modifiedOn: String,
  partitipants: Array<String>,
  scores: Object,
  status: String,
});
