import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Experience } from '@/lib/models';

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const data = await request.json();

    const result = await db.collection('experience').insertOne({
      ...data,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error in POST /api/experience:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create experience entry' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    
    const experience = await db
      .collection('experience')
      .find({})
      .sort({ startDate: -1 })
      .toArray();

    return NextResponse.json({ success: true, data: experience });
  } catch (error) {
    console.error('Error in GET /api/experience:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch experience entries' },
      { status: 500 }
    );
  }
} 