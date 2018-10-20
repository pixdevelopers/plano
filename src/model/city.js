import mongoose from 'mongoose';
const { Schema } = mongoose;
const ObjectIdSchema = Schema.ObjectId;

const CitySchema = new Schema({
    countryId: { type: ObjectIdSchema, ref: 'country' },
    name: String,
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
    
});

module.exports.City = mongoose.model('city', CitySchema);
