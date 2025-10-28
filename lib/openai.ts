import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateQuizQuestions() {
  const questions = [
    "What subjects do you enjoy most in school? (e.g., Math, Science, Arts, Literature, etc.)",
    "What are your hobbies and interests outside of school?",
    "Describe your dream job or career. What would you love to do every day?",
    "Which countries or regions interest you for studying abroad?",
    "What's your budget range for university education? (Low, Medium, High, No constraint)",
    "Do you prefer theoretical learning or hands-on practical work?",
    "What kind of work environment appeals to you? (Office, Lab, Outdoors, Remote, etc.)",
    "Are you interested in research, entrepreneurship, or working for companies?",
  ];

  return questions;
}

export async function analyzeQuizAnswers(answers: { question: string; answer: string }[]) {
  try {
    const prompt = `You are a career counselor AI. Based on the following answers from a teenager, recommend:
1. Top 5 career paths with match percentages (0-100%)
2. Explain why each career matches their profile

Answers:
${answers.map((a, i) => `Q${i + 1}: ${a.question}\nA${i + 1}: ${a.answer}`).join('\n\n')}

Respond in JSON format:
{
  "careers": [
    {
      "title": "Career Name",
      "description": "Why this career matches (2-3 sentences)",
      "matchPercentage": 85
    }
  ]
}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert career counselor helping teenagers discover their future paths.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    return JSON.parse(content);
  } catch (error) {
    console.error('OpenAI API error:', error);
    // Fallback recommendations
    return {
      careers: [
        {
          title: 'Software Engineer',
          description: 'Based on your interests, software engineering combines problem-solving with creativity. You\'ll build applications that impact millions of users.',
          matchPercentage: 85,
        },
        {
          title: 'Data Scientist',
          description: 'Your analytical skills make you perfect for data science. You\'ll uncover insights from data to drive business decisions.',
          matchPercentage: 78,
        },
        {
          title: 'Product Manager',
          description: 'Your leadership and communication skills align well with product management. You\'ll guide products from concept to launch.',
          matchPercentage: 72,
        },
      ],
    };
  }
}

export async function recommendUniversities(
  careers: string[],
  preferredCountries: string[],
  universities: any[]
) {
  // Extract fields from career recommendations
  const fieldMapping: { [key: string]: string[] } = {
    'Software Engineer': ['Computer Science', 'Engineering'],
    'Data Scientist': ['Computer Science', 'Mathematics', 'Sciences'],
    'Product Manager': ['Business', 'Engineering'],
    'Doctor': ['Medicine'],
    'Lawyer': ['Law'],
    'Architect': ['Architecture', 'Engineering'],
    'Teacher': ['Arts', 'Sciences'],
    'Engineer': ['Engineering'],
    'Researcher': ['Sciences', 'Physics', 'Chemistry'],
    'Designer': ['Arts', 'Architecture'],
    'Entrepreneur': ['Business'],
    'Economist': ['Economics', 'Business'],
  };

  const relevantFields = new Set<string>();
  careers.forEach((career) => {
    Object.keys(fieldMapping).forEach((key) => {
      if (career.toLowerCase().includes(key.toLowerCase())) {
        fieldMapping[key].forEach((field) => relevantFields.add(field));
      }
    });
  });

  // If no specific fields found, add common ones
  if (relevantFields.size === 0) {
    relevantFields.add('Computer Science');
    relevantFields.add('Business');
    relevantFields.add('Engineering');
  }

  // Filter universities
  let filtered = universities.filter((uni) => {
    // Check if university offers relevant fields
    const hasRelevantField = uni.fields.some((field: string) =>
      Array.from(relevantFields).some((rf) =>
        field.toLowerCase().includes(rf.toLowerCase())
      )
    );

    // Check if in preferred countries
    const inPreferredCountry =
      preferredCountries.length === 0 ||
      preferredCountries.some((country) =>
        uni.country.toLowerCase().includes(country.toLowerCase())
      );

    return hasRelevantField && inPreferredCountry;
  });

  // Sort by ranking and take top 10
  filtered.sort((a, b) => a.ranking - b.ranking);
  return filtered.slice(0, 10);
}

export default openai;

