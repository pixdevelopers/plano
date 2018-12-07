import mongoose from 'mongoose';
const { Schema } = mongoose;
const ObjectIdSchema = Schema.ObjectId;
module.exports.ClientPermissionSchema = new Schema({
  client: { type: ObjectIdSchema, ref: 'client' },
  fullAccess: { type: Boolean, default: false },
  isEnable: { type: Boolean, default: true },
  permission: Object,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});
