const Joi = require('joi');
import mongoose from 'mongoose';
const { Schema } = mongoose;
const ObjectIdSchema = Schema.ObjectId;

const schedulerSchema = new Schema({
  start: Date,
  end: Date,
  setting: Object,
  event: String,
  parent: { type: ObjectIdSchema, ref: 'client' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  client: { type: ObjectIdSchema, ref: 'client' }
});

function validateScheduler(scheduler) {
  const schema = { 
    start: Joi.date().required(), 
    end: Joi.date().required(), 
    event: Joi.string().required() };

  return Joi.validate(scheduler, schema);
}
module.exports.Scheduler = mongoose.model('scheduler', schedulerSchema);
module.exports.validate = validateScheduler;