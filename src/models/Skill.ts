import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  _id: string;
  name: string;
  category: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
  prerequisites: string[];
  marketDemand: number;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { 
    type: String, 
    enum: ['beginner', 'intermediate', 'advanced'], 
    required: true 
  },
  xpReward: { type: Number, required: true },
  prerequisites: [{ type: String }],
  marketDemand: { type: Number, min: 0, max: 100, default: 50 }
}, {
  timestamps: true
});

export const Skill = mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);
