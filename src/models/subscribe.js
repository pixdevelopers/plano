import mongoose from 'mongoose';
const { Schema } = mongoose;
const ObjectIdSchema = Schema.ObjectId;

module.exports.subscribeSchema = new Schema({
  clientId: { type: ObjectIdSchema, ref: 'client' },
  subscribeId: { type: ObjectIdSchema, ref: 'client' },
  showNotification: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});
