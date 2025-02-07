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
    
    const result = await db.collection('education').deleteOne({
      _id: new ObjectId(params.id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Education entry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/education/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete education entry' },
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
    
    const education = await db.collection('education').findOne({
      _id: new ObjectId(params.id),
    });

    if (!education) {
      return NextResponse.json(
        { success: false, error: 'Education entry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: education });
  } catch (error) {
    console.error('Error in GET /api/education/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch education entry' },
      { status: 500 }
    );
  }
} 