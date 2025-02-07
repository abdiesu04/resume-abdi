import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Certificate } from '@/lib/models';

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const data = await request.json();

    const result = await db.collection('certificates').insertOne({
      ...data,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error in POST /api/certificates:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create certificate' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    
    const certificates = await db
      .collection('certificates')
      .find({})
      .sort({ date: -1 })
      .toArray();

    return NextResponse.json({ success: true, data: certificates });
  } catch (error) {
    console.error('Error in GET /api/certificates:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch certificates' },
      { status: 500 }
    );
  }
} 