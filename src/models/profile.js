import mongoose from 'mongoose';
const { Schema } = mongoose;

module.exports.ProfileSchema = new Schema({
  phones: [String],
  gender: String,
  calendarType: { type: String, default: 'en' },
  templateUI: String,
  background: String,
  isParkingAvailble: Boolean,
  gallery:Array,
  address: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }
  },
  webSite: String,
  qrCode: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});
