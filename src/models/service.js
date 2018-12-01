import mongoose from 'mongoose';
import { RatingSchema } from './rating';
import { ReservationSchema } from './reservation';
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { Schema } = mongoose;
const ObjectIdSchema = Schema.ObjectId;
const serviceSchema = new Schema({
  date: Date,
  startTime: String,
  prePayment: Number,
  closeTime: String,
  duration: String,
  needToConfirm: Boolean,
  needToCall: Boolean,
  isCanceled: Boolean,
  description: String,
  setting: Object,
  reservation: ReservationSchema,
  rating: RatingSchema,
  notify:Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  serviceType: { type: ObjectIdSchema, ref: 'serviceType' },
  client: { type: ObjectIdSchema, ref: 'client' },
  scheduler: { type: ObjectIdSchema, ref: 'scheduler' },
  question: { type: ObjectIdSchema, ref: 'serviceQuestion' }
});

function validateService(service) {
  return Joi.validate(service, {
    time: Joi.string().required(),
    client: Joi.objectId().required(),
    serviceType: Joi.objectId().required()
  });
}

module.exports.Service = mongoose.model('service', serviceSchema);
module.exports.Validate = validateService;
