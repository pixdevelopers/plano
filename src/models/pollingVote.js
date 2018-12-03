import mongoose from 'mongoose';
const { Schema } = mongoose;
import { ServiceLocationSchema } from './pollingVoteGroup';
const PollingVoteSchema = new Schema({
  client: { type: ObjectIdSchema, ref: 'client' },
  polling: { type: ObjectIdSchema, ref: 'polling' },
  choiceIndex: [Number],
  clientName:String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

module.exports.PollingVote = mongoose.model(
  'pollingVote',
  PollingVoteSchema
);
