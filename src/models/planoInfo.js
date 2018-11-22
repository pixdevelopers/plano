import mongoose from 'mongoose';
const { Schema } = mongoose;
const ObjectIdSchema = Schema.ObjectId;

const PlanoInfoSchema = new Schema({
  page: String,
  key: String,
  value: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  client: { type: ObjectIdSchema, ref: 'client' }
});

module.exports.PlanoInfo = mongoose.model('planoInfo', PlanoInfoSchema);
