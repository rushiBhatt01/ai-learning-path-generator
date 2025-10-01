import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Skill } from '@/models/Skill';
import connectDB from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const skills = await Skill.find({});
    
    return NextResponse.json({ skills });
  } catch (error) {
    console.error('Get skills error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { name, category, description, difficulty, xpReward, prerequisites, marketDemand } = await request.json();

    if (!name || !category || !description || !difficulty || !xpReward) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDB();
    const skill = new Skill({
      name,
      category,
      description,
      difficulty,
      xpReward,
      prerequisites: prerequisites || [],
      marketDemand: marketDemand || 50
    });

    await skill.save();

    return NextResponse.json(
      { message: 'Skill created successfully', skill },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create skill error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
