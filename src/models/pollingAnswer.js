import mongoose from 'mongoose';
const { Schema } = mongoose;

const PollingAnswerSchema = new Schema({
  client: { type: ObjectIdSchema, ref: 'client' },
  polling: { type: ObjectIdSchema, ref: 'polling' },
  choiceIndex: [Number],
  clientName:String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

module.exports.PollingAnswer = mongoose.model(
  'pollingAnswer',
  PollingAnswerSchema
);
