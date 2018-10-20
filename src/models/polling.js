import mongoose from 'mongoose';
const { Schema } = mongoose;

const PollingSchema = new Schema({
  clientId: { type: ObjectIdSchema, ref: 'client' },
  title: String,
  choices: Array,
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

module.exports.Polling = mongoose.model('polling', PollingSchema);
