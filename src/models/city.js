import mongoose from 'mongoose';
const { Schema } = mongoose;
const ObjectIdSchema = Schema.ObjectId;
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const CitySchema = new Schema({
  country: { type: ObjectIdSchema, ref: 'country' },
  name: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  client: { type: ObjectIdSchema, ref: 'client' }
});

function validateCity(city) {
    return Joi.validate(city, { name: Joi.string()
        .max(50)
        .required(), country: Joi.objectId().required() });
}
module.exports.City = mongoose.model('city', CitySchema);
module.exports.validate = validateCity;