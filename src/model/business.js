import mongoose from 'mongoose';
const { Schema } = mongoose;
const ObjectIdSchema = Schema.ObjectId;

const BusinessSchema = new Schema({
    parentId: { type: ObjectIdSchema, ref: 'business' },
    name: String,
    needToConfirm:Boolean,
    userId: { type: ObjectIdSchema, ref: 'client' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,

});

module.exports.Business = mongoose.model('business', BusinessSchema);