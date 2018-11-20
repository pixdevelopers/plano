import mongoose from 'mongoose';
import { RatingSchema } from './rating';
import { ProfileSchema } from './profile';
import { SubscribeSchema } from './subscribe';
import { ServiceLocationSchema } from './serviceLocation';
import { ClientPermissionSchema } from './clientPermisson';
import { UserPermissionSchema } from './userPermisson';
const { Schema } = mongoose;
const ObjectIdSchema = Schema.ObjectId;
const PlanClientSchema = new Schema({ any: {} }, { strict: false });
const CilentSchema = new Schema({
  parentId: { type: ObjectIdSchema, ref: 'client' },
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
  businessId: { type: ObjectIdSchema, ref: 'business' },
  cityId: { type: ObjectIdSchema, ref: 'city' },
  plan: PlanClientSchema,
  profile: ProfileSchema,
  serviceLocations: [ServiceLocationSchema],
  subscribs: [SubscribeSchema],
  ratings: [RatingSchema],
  clientPermissions: [ClientPermissionSchema],
  userPermission: UserPermissionSchema
});
const Client = mongoose.model('client', CilentSchema);
module.exports = Client;
