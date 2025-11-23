import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

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

    // Convert simple history to chat format if needed, but here we just use generateContent for simplicity 
    // or chat session. For a single turn with context, we can construct the prompt.
    // However, maintaining a chat object is better for multi-turn.
    
    // We will use a stateless approach for this service function by passing context in the prompt 
    // or using the chat method if we were maintaining the instance.
    // To keep it simple and robust for this demo:
    
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

export const summarizeText = async (text: string, length: 'short' | 'medium' | 'long'): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Please summarize the following text. 
    Target length: ${length}.
    Identify the main points and ignore fluff.
    
    Text:
    ${text}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt
    });

    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("Gemini Summary Error:", error);
    return "Error generating summary. Please try again.";
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