import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'employee'], default: 'customer' },
  employeeRole: { type: String, enum: ['admin', 'manager', 'employee'], default: 'employee' },
  profileImage: { type: String, default: '' },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const User = models.User || model('User', UserSchema);
