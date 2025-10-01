import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  _id: string;
  title: string;
  description: string;
  skills: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in hours
  xpReward: number;
  content: {
    videos: string[];
    readings: string[];
    quizzes: string[];
  };
  instructor: string;
  rating: number;
  enrolledCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  skills: [{ type: String }],
  difficulty: { 
    type: String, 
    enum: ['beginner', 'intermediate', 'advanced'], 
    required: true 
  },
  duration: { type: Number, required: true },
  xpReward: { type: Number, required: true },
  content: {
    videos: [{ type: String }],
    readings: [{ type: String }],
    quizzes: [{ type: String }]
  },
  instructor: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  enrolledCount: { type: Number, default: 0 }
}, {
  timestamps: true
});

export const Course = mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);
