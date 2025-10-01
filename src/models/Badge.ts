import mongoose, { Schema, Document } from 'mongoose';

export interface IBadge extends Document {
  _id: string;
  name: string;
  description: string;
  icon: string;
  category: 'skill' | 'achievement' | 'milestone' | 'special';
  requirements: {
    xp?: number;
    skills?: string[];
    courses?: string[];
    streak?: number;
  };
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  createdAt: Date;
  updatedAt: Date;
}

const BadgeSchema = new Schema<IBadge>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['skill', 'achievement', 'milestone', 'special'], 
    required: true 
  },
  requirements: {
    xp: { type: Number },
    skills: [{ type: String }],
    courses: [{ type: String }],
    streak: { type: Number }
  },
  rarity: { 
    type: String, 
    enum: ['common', 'rare', 'epic', 'legendary'], 
    default: 'common' 
  }
}, {
  timestamps: true
});

export const Badge = mongoose.models.Badge || mongoose.model<IBadge>('Badge', BadgeSchema);
