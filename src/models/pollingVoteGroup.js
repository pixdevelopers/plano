import mongoose from 'mongoose';
const { Schema } = mongoose;

const PollingVoteGroupSchema = new Schema({
  owner: { type: ObjectIdSchema, ref: 'client' },
  name:String,
  enable:{type:Boolean ,default:true},
  description: String,
  members: [{ type: ObjectIdSchema, ref: 'client' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

module.exports.PollingVoteGroup = mongoose.model(
  'pollingVoteGroup',
  PollingVoteGroupSchema
);
