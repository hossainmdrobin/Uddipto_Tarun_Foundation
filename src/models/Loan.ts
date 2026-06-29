import mongoose, { Schema, model, models } from 'mongoose';

const LoanSchema = new Schema({
  memberId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  principalAmount: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  termMonths: { type: Number, required: true },
  startDate: { type: Date, required: true },
  status: { type: String, enum: ['active', 'completed', 'overdue'], default: 'active' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Loan = models.Loan || model('Loan', LoanSchema);
