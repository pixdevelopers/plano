import mongoose from 'mongoose';
const { Schema } = mongoose;
module.exports.ReservationSchema = new Schema({
  name: String,
  mobile: Number,
  reservingStatus: String,
  attachments: Array,
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});
