import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid skill ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('portfolio');
    
    const skill = await db.collection('skills').findOne({
      _id: new ObjectId(id)
    });

    if (!skill) {
      return NextResponse.json(
        { success: false, error: 'Skill not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: skill });
  } catch (error) {
    console.error('Error in GET /api/skills/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch skill' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid skill ID' },
        { status: 400 }
      );
    }

    if (!request.headers.get('content-type')?.includes('application/json')) {
      return NextResponse.json(
        { success: false, error: 'Content type must be application/json' },
        { status: 415 }
      );
    }

    const data = await request.json();
    
    // Validate visibility field
    if (typeof data.visible !== 'boolean') {
      return NextResponse.json(
        { success: false, error: 'Visibility must be a boolean value' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('portfolio');

    const result = await db.collection('skills').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          visible: data.visible,
          updatedAt: new Date()
        } 
      },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Skill not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error in PATCH /api/skills/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update skill visibility' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid skill ID' },
        { status: 400 }
      );
    }

    if (!request.headers.get('content-type')?.includes('application/json')) {
      return NextResponse.json(
        { success: false, error: 'Content type must be application/json' },
        { status: 415 }
      );
    }

    const data = await request.json();

    // Validate required fields and types
    if (!data.name || !data.category || 
        typeof data.proficiency === 'undefined' || 
        typeof data.yearsOfExperience === 'undefined') {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Ensure numeric values are within valid ranges
    const proficiency = Math.min(Math.max(0, Number(data.proficiency)), 100);
    const yearsOfExperience = Math.max(0, Number(data.yearsOfExperience));

    if (isNaN(proficiency) || isNaN(yearsOfExperience)) {
      return NextResponse.json(
        { success: false, error: 'Invalid numeric values for proficiency or years of experience' },
        { status: 400 }
      );
    }

    const updateData = {
      ...data,
      proficiency,
      yearsOfExperience,
      updatedAt: new Date()
    };

    const client = await clientPromise;
    const db = client.db('portfolio');

    const result = await db.collection('skills').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Skill not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error in PUT /api/skills/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update skill' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid skill ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('portfolio');

    const result = await db.collection('skills').deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Skill not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Skill deleted successfully' 
    });
  } catch (error) {
    console.error('Error in DELETE /api/skills/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete skill' },
      { status: 500 }
    );
  }
} 