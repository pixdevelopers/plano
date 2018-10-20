import mongoose from 'mongoose';
import { RatingSchema } from './rating';
import { ReservationSchema } from './reservation';
const { Schema } = mongoose;
const ObjectIdSchema = Schema.ObjectId;
const ServiceSchema = new Schema({
  serviceType: String,
  time: String,
  prePayment: Number,
  closeTime: String,
  duration: String,
  needToConfirm: Boolean,
  isCanceled: Boolean,
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  clientId: { type: ObjectIdSchema, ref: 'client' },
  calendarId: { type: ObjectIdSchema, ref: 'calendar' },
  location: { type: ObjectIdSchema, ref: 'client' },
  questionId: { type: ObjectIdSchema, ref: 'serviceQuestion' },
  reservation: ReservationSchema,
  ratings: [RatingSchema]
});

module.exports.Service = mongoose.model('service', ServiceSchema);
