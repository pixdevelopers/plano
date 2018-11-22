import mongoose from 'mongoose';
const { Schema } = mongoose;
const ObjectIdSchema = Schema.ObjectId;

const UsedPromotionSchema = new Schema({
  user: { type: ObjectIdSchema, ref: 'client' },
  plan: { type: ObjectIdSchema, ref: 'plan' }
});

const PromitionByPlanSchema = new Schema({
  dicountPersent: Number,
  countOfUsage: Number,
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  client: { type: ObjectIdSchema, ref: 'client' },
  plan: { type: ObjectIdSchema, ref: 'plan' }
});

const PromotionCodeSchema = new Schema({
  code: String,
  countOfUsage: Number,
  isExpired: Boolean,
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  user: { type: ObjectIdSchema, ref: 'client' },
  byPlan: [PromitionByPlanSchema],
  used: [UsedPromotionSchema]
});

module.exports.PromotionCode = mongoose.model(
  'PromotionCode',
  PromotionCodeSchema
);
