import mongoose from 'mongoose';
const { Schema } = mongoose;

const QuestionAnswerSchema = new Schema({
  client: { type: ObjectIdSchema, ref: 'client' },
  question: { type: ObjectIdSchema, ref: 'question' },
  answer: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

module.exports.QuestionAnswer = mongoose.model(
  'questionAnswer',
  QuestionAnswerSchema
);
