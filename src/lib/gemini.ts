import { GoogleGenerativeAI } from '@google/generative-ai';
import clientPromise from './mongodb';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function getPersonalContext() {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    
    const [projects, skills, education, experience, certificates] = await Promise.all([
      db.collection('projects').find().toArray(),
      db.collection('skills').find().toArray(), 
      db.collection('education').find().toArray(),
      db.collection('experience').find().toArray(),
      db.collection('certificates').find().toArray(),
    ]);

    const context = `
Database information about Abdi Esayas:

Contact Information:
- Email: [email protected]
- Phone: +251 938 813 894
- GitHub: github.com/abdiesu04
- LinkedIn: linkedin.com/in/abdiesu04
- Location: Addis Ababa, Ethiopia

Skills:
${skills.map(skill => `- ${skill.name} (${skill.proficiency}%, ${skill.yearsOfExperience} years)`).join('\n')}

Work Experience:
${experience.map(exp => `
• ${exp.position} at ${exp.company}
  ${new Date(exp.startDate).toLocaleDateString()} - ${exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
  ${exp.location}
  ${exp.description}
  Tech stack: ${exp.technologies?.join(', ')}
`).join('\n')}

Education:
${education.map(edu => `
• ${edu.degree} in ${edu.field}
  ${edu.institution}
  ${new Date(edu.startDate).toLocaleDateString()} - ${edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'Present'}
  ${edu.description}
`).join('\n')}

Projects:
${projects.map(project => `
• ${project.title}
  ${project.description}
  Tech stack: ${project.technologies?.join(', ')}
  ${project.liveUrl ? `Demo: ${project.liveUrl}` : ''}
  ${project.githubUrl ? `Code: ${project.githubUrl}` : ''}
`).join('\n')}

Certifications:
${certificates.map(cert => `
• ${cert.title}
  From: ${cert.issuer}
  Date: ${new Date(cert.date).toLocaleDateString()}
`).join('\n')}
`;

    return context;
  } catch (error) {
    console.error('Error fetching personal context:', error);
    return '';
  }
}

let cachedContext: string | null = null;
let chatHistory: { role: string, parts: string }[] = [];

export async function generateAIResponse(userMessage: string) {
  try {
    if (!cachedContext) {
      cachedContext = await getPersonalContext();
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
      generationConfig: {
        temperature: 0.9,
        topP: 0.9,
        topK: 40
      }
    });

    // Add user message to chat history
    chatHistory.push({ role: "user", parts: userMessage });
    
    const prompt = `
You are a friendly and helpful AI assistant helping someone learn about Abdi Esayas. You should respond to all questions, whether they are about Abdi Esayas or any other topic. Remember that you are not Abdi - you are helping others learn about him using the following information.

${cachedContext}

Previous conversation context:
${chatHistory.map(msg => `${msg.role}: ${msg.parts}`).join('\n')}

Question: ${userMessage}

Instructions:
1. Remember you are NOT Abdi - you are helping others learn about him
2. Respond to ALL questions, whether about Abdi or any other topic
3. For questions about Abdi, use the database information provided
4. For general questions, provide accurate and helpful responses based on your knowledge
5. Keep responses conversational and natural
6. Consider the previous conversation context when responding
7. Be friendly and engaging
8. If you're not completely sure about something, acknowledge that while still providing a helpful response
9. Always speak about Abdi in the third person
`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Add AI response to chat history
    chatHistory.push({ role: "assistant", parts: text });
    
    // Keep only last 10 messages to prevent context from growing too large
    if (chatHistory.length > 10) {
      chatHistory = chatHistory.slice(-10);
    }
    
    return {
      success: true,
      message: text,
    };
  } catch (error) {
    console.error('Error generating AI response:', error);
    return {
      success: false, 
      message: 'Sorry, I encountered an error. Please try again.',
    };
  }
}