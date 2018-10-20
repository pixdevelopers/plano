import mongoose from 'mongoose';
const { Schema } = mongoose;

const CountrySchema = new Schema({
    name: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,

});

module.exports.Country = mongoose.model('country', CountrySchema);
