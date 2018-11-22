import mongoose from 'mongoose';
import { RatingSchema } from './rating';
import { ProfileSchema } from './profile';
import { ServiceLocationSchema } from './serviceLocation';
import { ClientPermissionSchema } from './clientPermisson';
import { UserPermissionSchema } from './userPermisson';
const { Schema } = mongoose;
const ObjectIdSchema = Schema.ObjectId;
const PlanClientSchema = new Schema({ any: {} }, { strict: false });
const CilentSchema = new Schema({
  parent: { type: ObjectIdSchema, ref: 'client' },
  code: String,
  name: String,
  userName: String,
  email: String,
  password: { type: String, maxLength: 1024 },
  avatar: String,
  wallet: Number,
  isLocked: Boolean,
  isSystemUser: Boolean,
  isSharedPlan: Boolean,
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  business: { type: ObjectIdSchema, ref: 'business' },
  city: { type: ObjectIdSchema, ref: 'city' },
  plan: PlanClientSchema,
  profile: ProfileSchema,
  serviceLocations: [ServiceLocationSchema],
  ratings: [RatingSchema],
  clientPermissions: [ClientPermissionSchema],
  userPermission: UserPermissionSchema
});

function validateClient(client) {
  return Joi.validate(client, { name: Joi.string()
      .max(50)
      .required(), 
      business: Joi.ObjectId().required(),
    city: Joi.ObjectId().required() });
}

const Client = mongoose.model('client', CilentSchema);
module.exports = Client;
module.exports.validate = validateClient;
