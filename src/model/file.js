import mongoose from 'mongoose';
const { Schema } = mongoose;
const ObjectIdSchema = Schema.ObjectId;

const FileSchema = new Schema({
  type: String,
  path: String,
  extention: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  clientId: { type: ObjectIdSchema, ref: 'client' },
  serviceId: { type: ObjectIdSchema, ref: 'service' }
});

module.exports.File = mongoose.model('file', FileSchema);
