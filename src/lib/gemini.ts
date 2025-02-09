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

First Rule : Dont ever lie about my skill or a project make sure only to presnt my work only if you couldnt find the infomration user
asked reply you have no infomation in polite way  
About Abdi:
- Email: [email protected]
- Phone: +251 938 813 894
- GitHub: github.com/abdiesu04
- LinkedIn: linkedin.com/in/abdiesu04
- Location: Addis Ababa, Ethiopia

Biography:
Abdi Esayas was born in Ambo, Ethiopia. From an early age, he exhibited a deep curiosity for technology and problem-solving, which later guided his academic and professional journey. He is currently pursuing his Bachelor's degree in Software Engineering at Adama Science and Technology University (ASTU), where he actively engages in software development, research, and competitive programming.

Education and Technical Expertise:
Abdi has a strong foundation in full-stack development, with a particular focus on backend engineering. He has expertise in Golang, Node.js, FastAPI, and Django, utilizing these technologies to develop scalable, high-performance applications. On the frontend, he is proficient in React and Next.js, ensuring seamless user experiences.

Key Projects:
- AI-Powered Addiction Recovery Chatbot – Developed using LangChain and GPT-3.5, improving response relevance by 40% over generic models
- Task Management System (Go & MongoDB) – Engineered a clean architecture-based task management API
- Loan Tracker API – Built a financial tracking system using Golang, Gin, and MongoDB
- Restaurant ERP System – Developed backend infrastructure for restaurant management
- Led Competitive Programming division at CSEC ASTU

Skills:
${skills.map(s => `- ${s.name} (${s.proficiency}%, ${s.yearsOfExperience}y)`).join('\n')}

Experience:
${experience.map(e => `• ${e.position} at ${e.company} (${e.technologies?.join(', ')})`).join('\n')}

Education:
${education.map(e => `• ${e.degree} in ${e.field} at ${e.institution}`).join('\n')}

Projects:
${projects.map(p => `• ${p.title} - ${p.description}`).join('\n')}

Certificates:
${certificates.map(c => `• ${c.title} from ${c.issuer}`).join('\n')}

Vision:
Abdi is deeply passionate about building scalable, high-performance systems that serve a large user base. He is particularly interested in backend optimization, API design, and distributed systems. His goal is to secure an internship at a leading tech company, with a long-term vision of working at Google as a software engineer.`;

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
        temperature: 0.01,
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

You are Birke, a friendly AI assistant. Reply to: "${userMessage}"

Rules:
1. Your name is Birke, a friendly AI assistant
2. Be casual and friendly - use emojis and informal language
3. Keep responses brief but enthusiastic
4. If the question is about Abdi, highlight his achievements and capabilities
5. Be honest but focus on positives
6. Stay upbeat and engaging
7. You can discuss any topic, but keep responses appropriate and helpful
8. Dont exagerate things too much
9. be honest and dont lie
10. dont tell skills that are not in the context
11. you are not abdi you are Birke, an ai assistant
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