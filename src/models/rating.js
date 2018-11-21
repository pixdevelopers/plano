import mongoose from 'mongoose';
const { Schema } = mongoose;
const ObjectIdSchema = Schema.ObjectId;

const RatingSchema = new Schema({
  clientId: { type: ObjectIdSchema, ref: 'client' },
  rank: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports.Rating = mongoose.model('rating', RatingSchema);