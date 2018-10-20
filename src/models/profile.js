import mongoose from 'mongoose';
const { Schema } = mongoose;

module.exports.ProfileSchema = new Schema({
  mobile: String,
  gender: String,
  calendarType: { type: String, default: 'en' },
  template: String,
  background: String,
  isParkingAvailble: Boolean,
  address: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }
  },
  webSite: String,
  qrCode: String,
  enableNotification: Boolean,
  enableSendEmail: Boolean,
  enableSendSMS: Boolean,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});