import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Skill } from '@/lib/models';

export async function POST(request: NextRequest) {
  try {
    if (!request.headers.get('content-type')?.includes('application/json')) {
      return NextResponse.json(
        { success: false, error: 'Content type must be application/json' },
        { status: 415 }
      );
    }

    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.category || typeof data.proficiency !== 'number' || typeof data.yearsOfExperience !== 'number') {
      return NextResponse.json(
        { success: false, error: 'Missing or invalid required fields' },
        { status: 400 }
      );
    }

    // Ensure numeric values are within valid ranges
    const proficiency = Math.min(Math.max(0, Number(data.proficiency)), 100);
    const yearsOfExperience = Math.max(0, Number(data.yearsOfExperience));

    const skill: Partial<Skill> = {
      name: data.name,
      category: data.category,
      proficiency,
      yearsOfExperience,
      visible: true,
      createdAt: new Date()
    };

    const client = await clientPromise;
    const db = client.db('portfolio');
    const result = await db.collection('skills').insertOne(skill);

    return NextResponse.json({
      success: true,
      data: { ...skill, _id: result.insertedId }
    });
  } catch (error) {
    console.error('Error in POST /api/skills:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create skill' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    
    const skills = await db
      .collection('skills')
      .find({})
      .sort({ category: 1, proficiency: -1 })
      .toArray();

    // Ensure all numeric values are properly formatted
    const formattedSkills = skills.map(skill => ({
      ...skill,
      proficiency: Math.min(Math.max(0, Number(skill.proficiency) || 0), 100),
      yearsOfExperience: Math.max(0, Number(skill.yearsOfExperience) || 0)
    }));

    return NextResponse.json({ success: true, data: formattedSkills });
  } catch (error) {
    console.error('Error in GET /api/skills:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
} 