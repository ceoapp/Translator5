import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Translates English text to Thai using Gemini 2.5 Flash.
 * @param text The English text to translate.
 * @returns The translated Thai text.
 */
export const translateEngToThai = async (text: string): Promise<string> => {
  if (!text || text.trim().length === 0) {
    return "";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: text,
      config: {
        systemInstruction: "You are a professional translator. Translate the given English text to Thai accurately, naturally, and formally where appropriate. Return ONLY the translated Thai text without any explanations, preambles, or markdown formatting.",
        temperature: 0.3, // Lower temperature for more deterministic/accurate translations
      },
    });

    return response.text?.trim() || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to translate text. Please check your connection and try again.");
  }
};