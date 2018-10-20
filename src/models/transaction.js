import mongoose from 'mongoose';
const { Schema } = mongoose;
const ObjectIdSchema = Schema.ObjectId;

const TransactionSchema = new Schema({
  transactionNumber: String,
  transactionType: String,
  transactionFor: String,
  transactionStatus: String,
  amount: Number,
  currency: String,
  paymentSystem: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  clientId: { type: ObjectIdSchema, ref: 'client' }
});

module.exports.Transaction = mongoose.model('transaction', TransactionSchema);
