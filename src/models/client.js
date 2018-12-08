import mongoose from 'mongoose';
import { RatingSchema } from './rating';
import { ProfileSchema } from './profile';
import { ServiceLocationSchema } from './serviceLocation';
import { ClientPermissionSchema } from './clientPermission';
import { UserPermissionSchema } from './userPermission';
import jwt from 'jsonwebtoken';
import config from 'config';
const { Schema } = mongoose;
const ObjectIdSchema = Schema.ObjectId;
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const PlanClientSchema = new Schema({ any: {} }, { strict: false });
const CilentSchema = new Schema({
  parent: { type: ObjectIdSchema, ref: 'client' },
  userName: { type: String,lowercase:true, unique: true },
  code: String,
  name: String,
  email: String,
  mobile: String,
  password: { type: String, maxLength: 1024 },
  avatar: String,
  wallet: Number,
  isLocked: Boolean,
  isSharedPlan: Boolean,
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  token:String,
  tokenExpire:Date,
  business: { type: ObjectIdSchema, ref: 'business' },
  city: { type: ObjectIdSchema, ref: 'city' },
  plan: PlanClientSchema,
  profile: ProfileSchema,
  serviceLocations: [ServiceLocationSchema],
  ratings: [RatingSchema],
  clientPermissions: [ClientPermissionSchema],
  userPermission: UserPermissionSchema
});
CilentSchema.methods.generateAuthToken = function() {
  const isStaff=!!this.userPermission;
  const isClient =!!this.clientPermissions;
  const token = jwt.sign({ _id: this._id,isStaff:isStaff,isClient:isClient }, config.get('jwtPrivateKey'));
  return token;
};

function validateClient(client) {
  return Joi.validate(client, {
    name: Joi.string()
      .max(50)
      .required(),
    business: Joi.objectId().required(),
    city: Joi.objectId().required()
  });
}

const Client = mongoose.model('client', CilentSchema);
module.exports = Client;
module.exports.validate = validateClient;
