import mongoose from 'mongoose';
const { Schema } = mongoose;
const ObjectIdSchema = Schema.ObjectId;

const CitySchema = new Schema({
  countryId: { type: ObjectIdSchema, ref: 'country' },
  name: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  clientId: { type: ObjectIdSchema, ref: 'client' }
});

function validateCity(city) {
    return Joi.validate(city, { name: Joi.string()
        .max(50)
        .required(), countryId: Joi.ObjectId().required() });
}
module.exports.City = mongoose.model('city', CitySchema);
module.exports.validate = validateCity;