import * as mongoose from 'mongoose';
import { CompetitionStatus } from '../dto/CompetitionDto';

export const CompetitionDbSchema = new mongoose.Schema({
  organiser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: { type: String, ref: 'User', required: true },
  createdOn: { type: Number, ref: 'User', default: Date.now() },
  modifiedOn: { type: Number, ref: 'User', default: Date.now() },
  partitipants: {
    type: Array<mongoose.Schema.Types.ObjectId>,
    ref: 'User',
    default: [],
  },
  scores: Object,
  status: {
    type: String,
    enum: CompetitionStatus,
    default: CompetitionStatus.Open,
  },
});
