
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function translateText(text: string, targetLanguage: string): Promise<string> {
  if (!text) return "";
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: `Translate the following text to ${targetLanguage}. Return only the translated text, without any additional explanation or preamble: "${text}"`,
    });
    return response.text.trim();
  } catch (error) {
    console.error(`Error translating text to ${targetLanguage}:`, error);
    throw new Error(`Failed to translate. Please check your API key and network connection.`);
  }
}

export async function detectLanguage(text: string): Promise<string> {
  if (!text) return "Unknown";
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: `Detect the language of the following text. Return only the name of the language (e.g., "English", "Spanish", "Japanese"). Do not add any other words or punctuation. Text: "${text}"`,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error detecting language:", error);
    return "Unknown";
  }
}
