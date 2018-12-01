const Joi = require('joi');
import mongoose from 'mongoose';
const { Schema } = mongoose;
const ObjectIdSchema = Schema.ObjectId;

const blackListSchema = new Schema({
  mobile: String,
  cancelationCount: Number,
  service: { type: ObjectIdSchema, ref: 'service' }
});

module.exports.BlackList = mongoose.model('blacklist', blackListSchema);
