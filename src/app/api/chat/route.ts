import { NextResponse } from 'next/server';
import { generateAIResponse } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }

    const response = await generateAIResponse(message);
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in POST /api/chat:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
} 