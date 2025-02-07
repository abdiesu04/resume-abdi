import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Project } from '@/lib/models';

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const data = await request.json();

    const result = await db.collection('projects').insertOne({
      ...data,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error in POST /api/projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    
    const projects = await db
      .collection('projects')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error('Error in GET /api/projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
} 