import mongoose from 'mongoose';
const { Schema } = mongoose;

const ServiceQuestionSchema = new Schema({
  client: { type: ObjectIdSchema, ref: 'client' },
  name: String,
  questions: [QuestionSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

module.exports.ServiceQuestion = mongoose.model(
  'serviceQuestion',
  ServiceQuestionSchema
);
