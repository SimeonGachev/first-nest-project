import * as mongoose from 'mongoose';

export const CompetitionDbSchema = new mongoose.Schema({
  organiser: String,
  name: String,
  createdOn: String,
  modifiedOn: String,
  partitipants: Array<{ type: mongoose.Schema.Types.ObjectId; ref: 'User' }>,
  scores: Object,
  status: String,
});
