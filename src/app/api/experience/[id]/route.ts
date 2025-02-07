import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    
    const result = await db.collection('experience').deleteOne({
      _id: new ObjectId(params.id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Experience entry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/experience/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete experience entry' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    
    const experience = await db.collection('experience').findOne({
      _id: new ObjectId(params.id),
    });

    if (!experience) {
      return NextResponse.json(
        { success: false, error: 'Experience entry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: experience });
  } catch (error) {
    console.error('Error in GET /api/experience/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch experience entry' },
      { status: 500 }
    );
  }
} 