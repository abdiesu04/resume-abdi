export interface Certificate {
  _id: string;
  title: string;
  issuer: string;
  date: Date;
  imageUrl?: string;
  verificationUrl?: string;
  visible: boolean;
  createdAt: Date;
}

export const certificates: Certificate[] = [
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

// Helper function to get visible certificates
export function getVisibleCertificates() {
  return certificates.filter(cert => cert.visible);
}

// Helper function to get a certificate by ID
export function getCertificateById(id: string) {
  return certificates.find(cert => cert._id === id);
} 