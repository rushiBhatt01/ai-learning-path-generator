import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  email: string;
  name: string;
  password?: string;
  role: 'learner' | 'trainer' | 'policymaker' | 'admin';
  avatar?: string;
  xp: number;
  level: number;
  badges: string[];
  streak: number;
  lastLoginDate: Date;
  preferences: {
    theme: 'light' | 'dark' | 'galaxy';
    notifications: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String },
  role: { 
    type: String, 
    enum: ['learner', 'trainer', 'policymaker', 'admin'], 
    default: 'learner' 
  },
  avatar: { type: String },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  badges: [{ type: String }],
  streak: { type: Number, default: 0 },
  lastLoginDate: { type: Date, default: Date.now },
  preferences: {
    theme: { type: String, enum: ['light', 'dark', 'galaxy'], default: 'light' },
    notifications: { type: Boolean, default: true }
  }
}, {
  timestamps: true
});

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
