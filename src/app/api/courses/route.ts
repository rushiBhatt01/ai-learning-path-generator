import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Course } from '@/models/Course';
import connectDB from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const courses = await Course.find({});
    
    return NextResponse.json({ courses });
  } catch (error) {
    console.error('Get courses error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'admin' && session.user.role !== 'trainer')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { 
      title, 
      description, 
      skills, 
      difficulty, 
      duration, 
      xpReward, 
      content, 
      instructor 
    } = await request.json();

    if (!title || !description || !skills || !difficulty || !duration || !xpReward || !instructor) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDB();
    const course = new Course({
      title,
      description,
      skills,
      difficulty,
      duration,
      xpReward,
      content: content || { videos: [], readings: [], quizzes: [] },
      instructor,
      rating: 0,
      enrolledCount: 0
    });

    await course.save();

    return NextResponse.json(
      { message: 'Course created successfully', course },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create course error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
