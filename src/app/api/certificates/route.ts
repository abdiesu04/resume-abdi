import { NextRequest, NextResponse } from 'next/server';

// Static certificates array
const certificates = [
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const isAdmin = searchParams.get('admin') === 'true';
    
    // If admin view, show all certificates, otherwise only show visible ones
    const visibleCertificates = isAdmin 
      ? certificates 
      : certificates.filter(cert => cert.visible);
    
    return NextResponse.json({ success: true, data: visibleCertificates });
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch certificates' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!request.headers.get('content-type')?.includes('application/json')) {
      return NextResponse.json(
        { success: false, error: 'Content type must be application/json' },
        { status: 415 }
      );
    }

    const data = await request.json();

    // Validate required fields
    if (!data.title || !data.issuer || !data.date) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newCertificate = {
      _id: (certificates.length + 1).toString(),
      ...data,
      date: new Date(data.date),
      visible: true,
      createdAt: new Date()
    };

    certificates.push(newCertificate);

    return NextResponse.json({
      success: true,
      data: newCertificate
    });
  } catch (error) {
    console.error('Error creating certificate:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create certificate' },
      { status: 500 }
    );
  }
} 