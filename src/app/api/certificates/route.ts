import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  try {
    if (!request.headers.get('content-type')?.includes('application/json')) {
      return NextResponse.json(
        { success: false, error: 'Content type must be application/json' },
        { status: 415 }
      );
    }

    const client = await clientPromise;
    const db = client.db('portfolio');
    const data = await request.json();

    // Validate required fields
    if (!data.title || !data.issuer || !data.date) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const certificate = {
      ...data,
      date: new Date(data.date),
      visible: true,
      createdAt: new Date()
    };

    const result = await db.collection('certificates').insertOne(certificate);

    return NextResponse.json({
      success: true,
      data: { ...certificate, _id: result.insertedId }
    });
  } catch (error) {
    console.error('Error creating certificate:', error);
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
    
    const certificates = await db.collection('certificates')
      .find({ visible: true })
      .sort({ date: -1 })
      .toArray();

    return NextResponse.json({ success: true, data: certificates });
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch certificates' },
      { status: 500 }
    );
  }
} 