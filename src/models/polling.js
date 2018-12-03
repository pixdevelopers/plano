import mongoose from 'mongoose';
const { Schema } = mongoose;

const PollingSchema = new Schema({
  client: { type: ObjectIdSchema, ref: 'client' },
  groups: [{ type: ObjectIdSchema, ref: 'pollingVoteGroup' }],
  title: String,
  choices: Array,
  maxSelection: Number,
  isClosed: { type: Boolean, default: false },
  urlLink: String,
  isPublic: Boolean,
  confirm: String,
  isPrivate: { type: Boolean, default: false },
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

module.exports.Polling = mongoose.model('polling', PollingSchema);
