import mongoose from 'mongoose';
const { Schema } = mongoose;

module.exports.ClientPermissionSchema = new Schema({
  clientId: { type: ObjectIdSchema, ref: 'client' },
  haveFullAccess: { type: Boolean, default: false },
  isEnable: { type: Boolean, default: true },
  permistion: Object,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});
