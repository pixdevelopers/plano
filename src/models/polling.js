import mongoose from 'mongoose';
const { Schema } = mongoose;

const PollingSchema = new Schema({
  client: { type: ObjectIdSchema, ref: 'client' },
  title: String,
  choices: Array,
  maxSelection: Number,
  urlLink: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

module.exports.Polling = mongoose.model('polling', PollingSchema);
