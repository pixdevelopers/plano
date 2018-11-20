const Joi = require('joi');
import mongoose from 'mongoose';
const { Schema } = mongoose;

const CountrySchema = new Schema({
    name: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
    clientId: { type: ObjectIdSchema, ref: 'client' }
});
function validateCountry(country) {
    return Joi.validate(country, { name: Joi.string()
        .max(50)
        .required() });
}
module.exports.Country = mongoose.model('country', CountrySchema);
module.exports.validate = validateCountry;