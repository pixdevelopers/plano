import mongoose from 'mongoose';
const { Schema } = mongoose;
const ObjectIdSchema = Schema.ObjectId;
const ServiceTypeSchema = new Schema({
  name: String,
  price: Number,
  duration: String,
  description: String,
  client: { type: ObjectIdSchema, ref: 'client' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

module.exports.ServiceType = mongoose.model('serviceType', ServiceTypeSchema);
