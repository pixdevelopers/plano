import mongoose from 'mongoose';
const { Schema } = mongoose;

module.exports.ServiceQuestionSchema = new Schema({
  title: String,
  answerIsRequired: Boolean,
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});
