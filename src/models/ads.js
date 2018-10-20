import mongoose from 'mongoose';
const { Schema } = mongoose;
const ObjectIdSchema = Schema.ObjectId;

const AdsSchema = new Schema({
  title: String,
  adsURL: String,
  size: String,
  duration: String,
  isExpired: Boolean,
  pageLocation: String,
  linkToRedirect: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  clientId: { type: ObjectIdSchema, ref: 'client' }
});

module.exports.Ads = mongoose.model('ads', AdsSchema);
