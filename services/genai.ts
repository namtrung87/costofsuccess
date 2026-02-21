
import { GoogleGenAI } from "@google/genai";

// Safely get API key. In browser environments where 'process' is undefined, this safely defaults to empty string.
// This prevents "ReferenceError: process is not defined" crashes.
let apiKey = '';
try {
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
        apiKey = process.env.API_KEY;
    }
} catch (e) {
    // Ignore error if process is not defined or strict mode blocks access
    console.warn("API Key could not be loaded from process.env");
}

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey });

/**
 * Generates a character sprite based on a text description.
 * Uses gemini-2.5-flash-image for image generation.
 */
export const generateCharacterSprite = async (prompt: string): Promise<string | null> => {
  if (!apiKey) {
      console.warn("API Key missing. Cannot generate sprite.");
      return null;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      }
    });

    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          const mimeType = part.inlineData.mimeType || 'image/png';
          return `data:${mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error("Failed to generate character sprite:", error);
    return null;
  }
};
