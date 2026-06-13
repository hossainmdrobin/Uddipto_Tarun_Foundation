import mongoose, { Schema, model, models } from 'mongoose';

const TransactionSchema = new Schema({
  loanId: { type: Schema.Types.ObjectId, ref: 'Loan', required: true },
  customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  recordedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  note: { type: String },
});

export const Transaction = models.Transaction || model('Transaction', TransactionSchema);
