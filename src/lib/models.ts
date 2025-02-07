export interface Project {
  _id?: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  visible: boolean;
  createdAt: Date;
}

export interface Certificate {
  _id?: string;
  title: string;
  issuer: string;
  date: Date;
  imageUrl?: string;
  verificationUrl?: string;
  visible: boolean;
  createdAt: Date;
}

export interface Skill {
  _id?: string;
  name: string;
  category: string;
  proficiency: number;
  yearsOfExperience: number;
  visible: boolean;
  createdAt: Date;
}

export interface Education {
  _id?: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  achievements: string[];
  location: string;
  visible: boolean;
  createdAt: Date;
}

export interface Experience {
  _id?: string;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  visible: boolean;
  createdAt: Date;
}