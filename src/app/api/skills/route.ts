import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Skill } from '@/lib/models';

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const data = await request.json();

    const result = await db.collection('skills').insertOne({
      ...data,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, data: result });
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

    return NextResponse.json({ success: true, data: skills });
  } catch (error) {
    console.error('Error in GET /api/skills:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
} 