import { GoogleGenAI } from "@google/genai";

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
    // Initialize GoogleGenAI inside the function to avoid crash on module load if API_KEY is missing
    // and to ensure we use the most up-to-date key if it was selected dynamically.
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
    
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
    
    // Provide a more helpful error message if the API key is missing
    if (error instanceof Error && (error.message.includes("API Key") || error.message.includes("API_KEY"))) {
      throw new Error("API Key is missing or invalid. Please ensure you have selected a Google Cloud Project.");
    }
    
    throw new Error("Failed to translate text. Please check your connection and try again.");
  }
};