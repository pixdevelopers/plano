import mongoose from 'mongoose';
const { Schema } = mongoose;
module.exports.ReservationSchema = new Schema({
  isConfirmed: Boolean,
  isGroup: Boolean,
  countInGroup: Number,
  reservingStatus: String,
  hasAttachment: Boolean,
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});
