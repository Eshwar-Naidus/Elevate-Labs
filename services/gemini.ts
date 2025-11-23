import { GoogleGenAI, Type } from "@google/genai";
import { OptimizationResult } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to convert File to Base64 for Gemini
const fileToPart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve({
        inlineData: {
          data: base64String,
          mimeType: file.type
        }
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const generateCareerAdvice = async (
  history: { role: string; text: string }[],
  currentMessage: string
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `You are an expert AI Career Counsellor. 
    Your goal is to recommend career paths based on user interests, skills, and personality.
    
    Guidelines:
    1. Ask clarifying questions if the user is vague (e.g., "I like computers" -> ask about coding vs hardware).
    2. Suggest 2-3 specific roles when you have enough info.
    3. Provide a brief roadmap (skills to learn) for suggested roles.
    4. Keep the tone encouraging, professional, and concise.
    5. Detect intents like 'Technology', 'Arts', 'Commerce' and tailor advice accordingly.
    `;
    
    const chat = ai.chats.create({
      model,
      config: { systemInstruction },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: currentMessage });
    return result.text || "I'm having trouble analyzing that right now. Could you elaborate?";
  } catch (error) {
    console.error("Gemini Career Error:", error);
    return "I apologize, but I am unable to connect to the career database at the moment. Please ensure your API key is valid.";
  }
};

export const summarizeText = async (
  input: string | File, 
  length: 'short' | 'medium' | 'long'
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const parts: any[] = [];

    // Prompt construction
    const promptText = `Please summarize the provided content. 
    Target length: ${length}.
    Identify the main points and ignore fluff.
    If the content is a resume or technical document, extract key competencies.`;

    parts.push({ text: promptText });

    if (typeof input === 'string') {
      parts.push({ text: `Content: ${input}` });
    } else {
      const filePart = await fileToPart(input);
      parts.push(filePart);
    }

    const response = await ai.models.generateContent({
      model,
      contents: { parts }
    });

    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("Gemini Summary Error:", error);
    return "Error generating summary. If uploading a file, ensure it is a valid PDF or Image.";
  }
};

export const analyzeStockSentiment = async (newsHeadline: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Analyze the sentiment of this financial news headline for stock prediction purposes. 
    Headline: "${newsHeadline}"
    
    Provide a brief analysis (1-2 sentences) and a sentiment label (Bullish/Bearish/Neutral).`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt
    });

    return response.text || "Analysis unavailable.";
  } catch (error) {
    return "Could not analyze sentiment.";
  }
};

export const optimizeResume = async (
  jobDescription: string,
  softwareResume: string | File,
  coreResume: string | File
): Promise<OptimizationResult | null> => {
  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `You are a strict Resume Strategist.
    1. Analyze the Job Description to determine if the candidate should use their 'Software' resume or 'Core' (Electrical) resume.
    2. Tailor the selected resume to the job description:
       - Rewrite the summary and bullet points to emphasize relevant skills.
       - Use keywords from the job description where applicable.
       - STRICTLY DO NOT HALLUCINATE: Do not add skills, experience, or projects not present in the provided resume files. Only rephrase existing facts.
    3. Return the result in JSON format following the schema.`;

    const parts: any[] = [];

    // Add Job Description
    parts.push({ text: `Job Description:\n${jobDescription}` });

    // Add Software Resume
    if (typeof softwareResume === 'string') {
      parts.push({ text: `Resume 1 (Software):\n${softwareResume}` });
    } else {
      parts.push({ text: "Resume 1 (Software File):" });
      parts.push(await fileToPart(softwareResume));
    }

    // Add Core Resume
    if (typeof coreResume === 'string') {
      parts.push({ text: `Resume 2 (Core):\n${coreResume}` });
    } else {
      parts.push({ text: "Resume 2 (Core File):" });
      parts.push(await fileToPart(coreResume));
    }

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        selectedResumeType: { type: Type.STRING, enum: ['Software', 'Core'] },
        content: {
          type: Type.OBJECT,
          properties: {
            fullName: { type: Type.STRING },
            title: { type: Type.STRING },
            contactInfo: { type: Type.STRING },
            summary: { type: Type.STRING },
            skills: { type: Type.ARRAY, items: { type: Type.STRING } },
            experience: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  role: { type: Type.STRING },
                  company: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  points: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
              }
            },
            projects: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  techStack: { type: Type.STRING },
                  description: { type: Type.STRING }
                }
              }
            },
            education: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  degree: { type: Type.STRING },
                  institution: { type: Type.STRING },
                  year: { type: Type.STRING }
                }
              }
            }
          },
          required: ['fullName', 'title', 'summary', 'skills', 'experience', 'projects', 'education']
        }
      },
      required: ['selectedResumeType', 'content']
    };

    const response = await ai.models.generateContent({
      model,
      contents: { parts },
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: responseSchema as any
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as OptimizationResult;
    }
    return null;
  } catch (error) {
    console.error("Resume Optimization Error:", error);
    return null;
  }
};