import mongoose from 'mongoose';
const { Schema } = mongoose;
const ObjectIdSchema = Schema.ObjectId;

module.exports.ServiceLocationSchema = new Schema({
  locationId: { type: ObjectIdSchema, ref: 'client' },
  name: String,
  createdAt: { type: Date, default: Date.now }
});
