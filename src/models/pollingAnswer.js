import mongoose from 'mongoose';
const { Schema } = mongoose;

const PollingAnswerSchema = new Schema({
  clientId: { type: ObjectIdSchema, ref: 'client' },
  pollingId: { type: ObjectIdSchema, ref: 'polling' },
  choiceIndex: Number,
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

module.exports.PollingAnswer = mongoose.model(
  'pollingAnswer',
  PollingAnswerSchema
);
