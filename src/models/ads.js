const Joi = require('joi');
import mongoose from 'mongoose';
const { Schema } = mongoose;
const ObjectIdSchema = Schema.ObjectId;

const AdsSchema = new Schema({
  title: String,
  adsURL: String,
  size: String,
  duration: Number,
  isExpired: Boolean,
  pageLocation: String,
  linkToRedirect: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  client: { type: ObjectIdSchema, ref: 'client' }
});

function validateAds(ads) {
  const schema = { title: Joi.string().required(), duration: Joi.number().required(), pageLocation: Joi.string().required(), linkToRedirect: Joi.string().required() };

  return Joi.validate(ads, schema);
}
module.exports.Ads = mongoose.model('ads', AdsSchema);
module.exports.validate = validateAds;