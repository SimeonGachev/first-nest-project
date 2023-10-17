import * as mongoose from 'mongoose';

export const CompetitionDbSchema = new mongoose.Schema({
  organiser: String,
  name: String,
  createdOn: String,
  modifiedOn: String,
  partitipants: Array<String>,
  scores: Object,
  status: String,
});
