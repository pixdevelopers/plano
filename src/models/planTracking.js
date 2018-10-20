import mongoose from 'mongoose';
const { Schema } = mongoose;
const ObjectIdSchema = Schema.ObjectId;

const PlanTrackingSchema = new Schema({
  registerDate: Date,
  expireDate: Date,
  size: String,
  isExpired: Boolean,
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  clientId: { type: ObjectIdSchema, ref: 'client' },
  planId: { type: ObjectIdSchema, ref: 'plan' }
});

module.exports.PlanTracking = mongoose.model(
  'planTracking',
  PlanTrackingSchema
);
