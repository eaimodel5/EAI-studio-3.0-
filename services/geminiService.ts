
import { GoogleGenAI, Type, Schema, Content } from "@google/genai";
import { SYSTEM_INSTRUCTION_NL, SYSTEM_INSTRUCTION_EN } from "../constants";
import { EAIAnalysis, MechanicalState } from "../types";

let genAI: GoogleGenAI | null = null;
let currentLanguage: 'nl' | 'en' = 'nl';

// ADAPTIVE COMPUTE MODELS
const MODEL_PRO = 'gemini-3-pro-preview';
const MODEL_FLASH = 'gemini-3-flash-preview';

const COMPLEXITY_THRESHOLD = 80; 
const TEMPERATURE = 0.7;

let chatHistory: Content[] = [];

export const initializeGemini = () => {
  if (!process.env.API_KEY) return;
  genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const resetChatSession = () => {
    chatHistory = [];
};

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    conversational_response: {
      type: Type.STRING,
      description: "Direct response to the learner, free of any technical jargon.",
    },
    analysis: {
      type: Type.OBJECT,
      properties: {
        process_phases: { type: Type.ARRAY, items: { type: Type.STRING } },
        coregulation_bands: { type: Type.ARRAY, items: { type: Type.STRING } },
        task_densities: { type: Type.ARRAY, items: { type: Type.STRING } },
        secondary_dimensions: { type: Type.ARRAY, items: { type: Type.STRING } },
        active_fix: { type: Type.STRING, nullable: true },
        reasoning: { type: Type.STRING, description: "Internal pedagogical logic for this turn." },
        current_profile: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, nullable: true },
            subject: { type: Type.STRING, nullable: true },
            level: { type: Type.STRING, nullable: true },
            grade: { type: Type.STRING, nullable: true },
          }
        },
        task_density_balance: { type: Type.NUMBER, description: "0-100 balance between AI and Learner work." },
        epistemic_status: { type: Type.STRING },
        cognitive_mode: { type: Type.STRING }
      },
      required: ["process_phases", "coregulation_bands", "task_densities", "secondary_dimensions", "reasoning", "current_profile", "task_density_balance", "epistemic_status", "cognitive_mode"],
    },
  },
  required: ["conversational_response", "analysis"],
};

const selectModel = (message: string): string => {
    // Commands always use Pro for better reasoning and instruction following
    if (message.startsWith('/')) return MODEL_PRO;
    // Short messages use Flash
    if (message.length < COMPLEXITY_THRESHOLD) return MODEL_FLASH;
    return MODEL_PRO;
};

export const sendMessageToGemini = async (message: string, lang: 'nl' | 'en' = 'nl'): Promise<{ text: string; analysis: EAIAnalysis; mechanical: MechanicalState }> => {
  if (!genAI) initializeGemini();
  if (!genAI) throw new Error("API Key missing");

  if (currentLanguage !== lang) {
      chatHistory = [];
      currentLanguage = lang;
  }

  const selectedModelName = selectModel(message);
  const systemInstruction = lang === 'en' ? SYSTEM_INSTRUCTION_EN : SYSTEM_INSTRUCTION_NL;

  try {
    const startTime = Date.now();
    const contents: Content[] = [
        ...chatHistory,
        { role: 'user', parts: [{ text: message }] }
    ];

    const response = await genAI.models.generateContent({
        model: selectedModelName,
        contents: contents,
        config: {
            systemInstruction: systemInstruction,
            responseMimeType: "application/json",
            responseSchema: responseSchema,
            temperature: TEMPERATURE,
            // Pro model gets a thinking budget to ensure it follows the SSOT directives correctly
            thinkingConfig: selectedModelName === MODEL_PRO ? { thinkingBudget: 4000 } : undefined
        }
    });

    const endTime = Date.now();
    const responseText = response.text || "{}";

    chatHistory.push({ role: 'user', parts: [{ text: message }] });
    chatHistory.push({ role: 'model', parts: [{ text: responseText }] });

    const usage = response.usageMetadata || { promptTokenCount: 0, candidatesTokenCount: 0 };
    const mechanical: MechanicalState = {
        latencyMs: endTime - startTime,
        inputTokens: usage.promptTokenCount || 0,
        outputTokens: usage.candidatesTokenCount || 0,
        model: selectedModelName, 
        temperature: TEMPERATURE,
        timestamp: new Date()
    };

    const parsed = JSON.parse(responseText);
    return {
      text: parsed.conversational_response,
      analysis: parsed.analysis,
      mechanical: mechanical
    };

  } catch (error) {
    console.error("Gemini Critical Failure:", error);
    throw error;
  }
};
