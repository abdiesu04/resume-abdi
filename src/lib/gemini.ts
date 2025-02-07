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
- Go (Golang)
- Python (Django)
- Java
- C++
- Javascript (Node.js, Next.js)
- TypeScript
- PHP
- SQL
- MongoDB
- PostgreSQL
- Docker
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

export async function generateAIResponse(userMessage: string) {
  try {
    if (!cachedContext) {
      cachedContext = await getPersonalContext();
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
      generationConfig: {
        temperature: 0.3,
        topP: 0.8,
        topK: 40
      }
    });
    
    const prompt = `
${cachedContext}

Question: ${userMessage}

Instructions:
1. Answer directly using only the information provided above
2. Keep responses brief but highlight Abdi's strengths and achievements
3. When information is not available, respond positively by highlighting related strengths:
   - For communication skills: "Based on Abdi's experience leading projects and collaborating with teams, he demonstrates excellent communication and interpersonal skills"
   - For technical abilities: "Abdi has proven expertise in [related skills] and consistently demonstrates the ability to quickly master new technologies"
4. Use confident and enthusiastic language that emphasizes achievements
5. Focus on showcasing Abdi's capabilities while maintaining accuracy
6. Highlight relevant experience and skills that demonstrate excellence in the asked area
`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
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