import mongoose from 'mongoose';
const { Schema } = mongoose;
const ObjectIdSchema = Schema.ObjectId;

module.exports.RatingSchema = new Schema({
  clientId: { type: ObjectIdSchema, ref: 'client' },
  rank: Number,
  createdAt: { type: Date, default: Date.now }
});
