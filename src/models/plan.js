import mongoose from 'mongoose';
const { Schema } = mongoose;
const ObjectIdSchema = Schema.ObjectId;

const PlanSchema = new Schema({
  title: String,
  duration: String,
  price: Number,
  discount: Number,
  isFree: Boolean,
  isActive: Boolean,
  clientCount: Number,
  countOfServicePerMonth: Number,
  branding: Boolean,
  includAds: Boolean,
  calendarSync: Boolean,
  remindByEmail: Boolean,
  remindBySMS: Boolean,
  countOfPhotosInGallery: Number,
  websiteIntegation: Boolean,
  paymentOption: Boolean,
  countOfTrailDay: Boolean,
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  client: { type: ObjectIdSchema, ref: 'client' }
});

module.exports.Plan = mongoose.model('plan', PlanSchema);
