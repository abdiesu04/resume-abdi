import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Education } from '@/lib/models';

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const data = await request.json();

    const result = await db.collection('education').insertOne({
      ...data,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error in POST /api/education:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create education entry' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    
    const education = await db
      .collection('education')
      .find({})
      .sort({ startDate: -1 })
      .toArray();

    return NextResponse.json({ success: true, data: education });
  } catch (error) {
    console.error('Error in GET /api/education:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch education entries' },
      { status: 500 }
    );
  }
} 