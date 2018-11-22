import mongoose from 'mongoose';
const { Schema } = mongoose;
const ObjectIdSchema = Schema.ObjectId;

module.exports.ServiceLocationSchema = new Schema({
  location: { type: ObjectIdSchema, ref: 'client' },
  name: String,
  createdAt: { type: Date, default: Date.now }
});
