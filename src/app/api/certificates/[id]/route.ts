import { NextRequest, NextResponse } from 'next/server';

// Define certificate type
type Certificate = {
  _id: string;
  title: string;
  issuer: string;
  date: Date;
  imageUrl: string;
  verificationUrl: string;
  visible: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

// Import the certificates array from the parent route
const certificates: Certificate[] = [
  {
    _id: '1',
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: new Date('2023-12-15'),
    imageUrl: 'https://example.com/aws-cert.png',
    verificationUrl: 'https://aws.amazon.com/verify',
    visible: true,
    createdAt: new Date('2023-12-15')
  },
  {
    _id: '2',
    title: 'Professional Full Stack Developer',
    issuer: 'Meta',
    date: new Date('2023-10-20'),
    imageUrl: 'https://example.com/meta-cert.png',
    verificationUrl: 'https://meta.com/verify',
    visible: true,
    createdAt: new Date('2023-10-20')
  },
  {
    _id: '3',
    title: 'Python for Data Science',
    issuer: 'IBM',
    date: new Date('2023-08-05'),
    imageUrl: 'https://example.com/ibm-cert.png',
    verificationUrl: 'https://ibm.com/verify',
    visible: true,
    createdAt: new Date('2023-08-05')
  },
  {
    _id: '4',
    title: 'React Native Specialist',
    issuer: 'Microsoft',
    date: new Date('2023-06-30'),
    imageUrl: 'https://example.com/microsoft-cert.png',
    verificationUrl: 'https://microsoft.com/verify',
    visible: true,
    createdAt: new Date('2023-06-30')
  }
];

export async function GET(
  _request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id;
    const certificate = certificates.find(cert => cert._id === id);

    if (!certificate) {
      return NextResponse.json(
        { success: false, error: 'Certificate not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: certificate });
  } catch (error) {
    console.error('Error fetching certificate:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch certificate' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id;
    
    if (!request.headers.get('content-type')?.includes('application/json')) {
      return NextResponse.json(
        { success: false, error: 'Content type must be application/json' },
        { status: 415 }
      );
    }

    const data = await request.json();

    if (typeof data.visible !== 'boolean') {
      return NextResponse.json(
        { success: false, error: 'Visibility must be a boolean' },
        { status: 400 }
      );
    }

    const certificateIndex = certificates.findIndex(cert => cert._id === id);
    
    if (certificateIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Certificate not found' },
        { status: 404 }
      );
    }

    certificates[certificateIndex] = {
      ...certificates[certificateIndex],
      visible: data.visible,
      updatedAt: new Date()
    };

    return NextResponse.json({ 
      success: true, 
      data: certificates[certificateIndex] 
    });
  } catch (error) {
    console.error('Error updating certificate visibility:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update certificate visibility' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id;

    if (!request.headers.get('content-type')?.includes('application/json')) {
      return NextResponse.json(
        { success: false, error: 'Content type must be application/json' },
        { status: 415 }
      );
    }

    const data = await request.json();

    if (!data.title || !data.issuer || !data.date) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const certificateIndex = certificates.findIndex(cert => cert._id === id);
    
    if (certificateIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Certificate not found' },
        { status: 404 }
      );
    }

    const updateData = {
      ...certificates[certificateIndex],
      ...data,
      date: new Date(data.date),
      updatedAt: new Date()
    };

    certificates[certificateIndex] = updateData;

    return NextResponse.json({ success: true, data: updateData });
  } catch (error) {
    console.error('Error updating certificate:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update certificate' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id;
    const certificateIndex = certificates.findIndex(cert => cert._id === id);
    
    if (certificateIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Certificate not found' },
        { status: 404 }
      );
    }

    certificates.splice(certificateIndex, 1);

    return NextResponse.json({ 
      success: true, 
      message: 'Certificate deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting certificate:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete certificate' },
      { status: 500 }
    );
  }
}