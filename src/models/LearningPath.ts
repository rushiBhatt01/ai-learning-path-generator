import mongoose, { Schema, Document } from 'mongoose';

export interface ILearningPath extends Document {
  _id: string;
  userId: string;
  title: string;
  description: string;
  skills: string[];
  courses: string[];
  progress: number; // percentage
  completedSkills: string[];
  completedCourses: string[];
  xpEarned: number;
  estimatedDuration: number; // in hours
  status: 'active' | 'completed' | 'paused';
  createdAt: Date;
  updatedAt: Date;
}

const LearningPathSchema = new Schema<ILearningPath>({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  skills: [{ type: String }],
  courses: [{ type: String }],
  progress: { type: Number, min: 0, max: 100, default: 0 },
  completedSkills: [{ type: String }],
  completedCourses: [{ type: String }],
  xpEarned: { type: Number, default: 0 },
  estimatedDuration: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['active', 'completed', 'paused'], 
    default: 'active' 
  }
}, {
  timestamps: true
});

export const LearningPath = mongoose.models.LearningPath || mongoose.model<ILearningPath>('LearningPath', LearningPathSchema);
