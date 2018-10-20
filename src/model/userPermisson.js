import mongoose from 'mongoose';
const { Schema } = mongoose;

module.exports.UserPermissionSchema = new Schema({
  IsSuperAdnim: { type: Boolean, default: false },
  IsAdmin: { type: Boolean, default: false },
  isEnable: { type: Boolean, default: true },
  permistion: Object,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});
