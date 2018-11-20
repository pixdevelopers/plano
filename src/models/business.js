import mongoose from 'mongoose';
const { Schema } = mongoose;
const ObjectIdSchema = Schema.ObjectId;

const BusinessSchema = new Schema({
  parentId: { type: ObjectIdSchema, ref: 'business' },
  name: String,
  needToConfirm: Boolean,
  clientId: { type: ObjectIdSchema, ref: 'client' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

function validateBusiness(business) {
    return Joi.validate(business, {
    name: Joi.string()
      .max(50)
      .required(),
    parentId: Joi.ObjectId().required()
  });
}

module.exports.Business = mongoose.model('business', BusinessSchema);
module.exports.validate = validateBusiness;