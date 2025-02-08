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
      db.collection('certificates').find().toArray()
    ]);

    const context = `
About Abdi:
- Email: [email protected]
- Phone: +251 938 813 894
- GitHub: github.com/abdiesu04
- LinkedIn: linkedin.com/in/abdiesu04
- Location: Addis Ababa, Ethiopia

Skills:
${skills.map(s => `- ${s.name} (${s.proficiency}%, ${s.yearsOfExperience}y)`).join('\n')}

Experience:
${experience.map(e => `• ${e.position} at ${e.company} (${e.technologies?.join(', ')})`).join('\n')}

Education:
${education.map(e => `• ${e.degree} in ${e.field} at ${e.institution}`).join('\n')}

Projects:
${projects.map(p => `• ${p.title} - ${p.description}`).join('\n')}

Certificates:
${certificates.map(c => `• ${c.title} from ${c.issuer}`).join('\n')}`;

    return context;
  } catch (error) {
    console.error('Error:', error);
    return '';
  }
}

let cachedContext: string | null = null;
let conversationHistory: string[] = [];

export async function generateAIResponse(userMessage: string) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
      generationConfig: {
        temperature: 0.6,
        topP: 0.95,
        topK: 40
      }
    });

    if (!cachedContext) {
      cachedContext = await getPersonalContext();
    }

    conversationHistory.push(`User: ${userMessage}`);

    const prompt = `
${cachedContext}
History: ${conversationHistory.slice(-6).join('\n')}

You are a friendly AI assistant. Reply to: "${userMessage}"

Rules:
1. Be casual and friendly - use emojis and informal language
2. Keep responses brief but enthusiastic
3. If the question is about Abdi, highlight his achievements and capabilities
4. Be honest but focus on positives
5. Stay upbeat and engaging
6. You can discuss any topic, but keep responses appropriate and helpful
7. Dont exagerate things too much
8. be honest and dont lie
10. dont tell skills that are not in the context
11. you are not abdi you are an ai assistant
`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    if (!response) {
      throw new Error('Empty response from AI');
    }
    const text = await response.text();
    if (!text) {
      throw new Error('Empty text from AI response');
    }
    conversationHistory.push(`AI: ${text}`);
    
    return { success: true, message: text };
  } catch (error) {
    console.error('Error:', error);
    return {
      success: false,
      message: "Oops! 😅 Having some technical hiccups. Mind trying again?"
    };
  }
}