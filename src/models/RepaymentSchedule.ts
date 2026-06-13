import mongoose, { Schema, model, models } from 'mongoose';

const InstallmentSchema = new Schema({
  dueDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['paid', 'unpaid', 'overdue'], default: 'unpaid' },
});

const RepaymentScheduleSchema = new Schema({
  loanId: { type: Schema.Types.ObjectId, ref: 'Loan', required: true },
  installments: [InstallmentSchema],
});

export const RepaymentSchedule = models.RepaymentSchedule || model('RepaymentSchedule', RepaymentScheduleSchema);
