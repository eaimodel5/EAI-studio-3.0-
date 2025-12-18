
import { GoogleGenAI, Type, Schema, Content } from "@google/genai";
import { 
  EAI_SSOT_JSON_NL, 
  EAI_SSOT_JSON_EN, 
  SYSTEM_INSTRUCTION_TEMPLATE_NL, 
  SYSTEM_INSTRUCTION_TEMPLATE_EN 
} from "../constants";
import { EAIAnalysis, MechanicalState } from "../types";

let genAI: GoogleGenAI | null = null;
let currentLanguage: 'nl' | 'en' = 'nl';

const MODEL_PRO = 'gemini-3-pro-preview';
const MODEL_FLASH = 'gemini-3-flash-preview';

const COMPLEXITY_THRESHOLD = 60; 
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
    conversational_response: { type: Type.STRING },
    analysis: {
      type: Type.OBJECT,
      properties: {
        process_phases: { type: Type.ARRAY, items: { type: Type.STRING } },
        coregulation_bands: { type: Type.ARRAY, items: { type: Type.STRING } },
        task_densities: { type: Type.ARRAY, items: { type: Type.STRING } },
        secondary_dimensions: { type: Type.ARRAY, items: { type: Type.STRING } },
        active_fix: { type: Type.STRING, nullable: true },
        reasoning: { type: Type.STRING },
        current_profile: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, nullable: true },
            subject: { type: Type.STRING, nullable: true },
            level: { type: Type.STRING, nullable: true },
            grade: { type: Type.STRING, nullable: true },
          }
        },
        task_density_balance: { type: Type.NUMBER },
        epistemic_status: { type: Type.STRING },
        cognitive_mode: { type: Type.STRING }
      },
      required: ["process_phases", "coregulation_bands", "task_densities", "secondary_dimensions", "reasoning", "current_profile", "task_density_balance", "epistemic_status", "cognitive_mode"],
    },
  },
  required: ["conversational_response", "analysis"],
};

// Helper to strip Markdown code blocks if the model adds them (Common GenAI quirk)
const cleanJsonString = (input: string): string => {
    let clean = input.trim();
    // Remove wrapping ```json ... ``` or just ``` ... ```
    if (clean.startsWith('```')) {
        clean = clean.replace(/^```(json)?/, '').replace(/```$/, '');
    }
    return clean.trim();
};

// Adaptive Routing 2.0
const selectModel = (message: string, history: Content[]): string => {
    // 1. Direct Command override
    if (message.startsWith('/')) return MODEL_PRO;
    
    // 2. Length check
    if (message.length > COMPLEXITY_THRESHOLD) return MODEL_PRO;

    // 3. Context check (Deep Logic)
    // If the conversation is getting long (> 6 turns), use Pro to maintain context window stability and reasoning
    if (history.length > 6) return MODEL_PRO;

    return MODEL_FLASH;
};

export const sendMessageToGemini = async (message: string, lang: 'nl' | 'en' = 'nl'): Promise<{ text: string; analysis: EAIAnalysis; mechanical: MechanicalState }> => {
  if (!genAI) initializeGemini();
  if (!genAI) throw new Error("API Key missing");

  if (currentLanguage !== lang) {
      chatHistory = [];
      currentLanguage = lang;
  }

  const selectedModelName = selectModel(message, chatHistory);
  
  // CRITICAL: SSOT INJECTION
  const template = lang === 'en' ? SYSTEM_INSTRUCTION_TEMPLATE_EN : SYSTEM_INSTRUCTION_TEMPLATE_NL;
  const ssotContent = lang === 'en' ? EAI_SSOT_JSON_EN : EAI_SSOT_JSON_NL;
  
  // Replace the placeholder with the actual JSON content
  const systemInstruction = template.replace(
      '[[SSOT_INJECTION_POINT]]', 
      `HIER IS DE WAARHEID (SSOT) JSON. GEBRUIK DIT VOOR ALLE BESLISSINGEN:\n\`\`\`json\n${ssotContent}\n\`\`\``
  );

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
            // Only use thinking budget for Pro model to save tokens/latency on Flash
            thinkingConfig: selectedModelName === MODEL_PRO ? { thinkingBudget: 4000 } : undefined
        }
    });

    const endTime = Date.now();
    const responseText = response.text || "{}";
    const cleanedJson = cleanJsonString(responseText);

    // Update history
    chatHistory.push({ role: 'user', parts: [{ text: message }] });
    chatHistory.push({ role: 'model', parts: [{ text: responseText }] }); // Store original

    const usage = response.usageMetadata || { promptTokenCount: 0, candidatesTokenCount: 0 };
    const mechanical: MechanicalState = {
        latencyMs: endTime - startTime,
        inputTokens: usage.promptTokenCount || 0,
        outputTokens: usage.candidatesTokenCount || 0,
        model: selectedModelName, 
        temperature: TEMPERATURE,
        timestamp: new Date()
    };

    let parsed;
    try {
        parsed = JSON.parse(cleanedJson);
    } catch (e) {
        console.error("JSON Parse Error on:", cleanedJson);
        // Robust Fallback safety
        parsed = { 
            conversational_response: "Mijn excuses, er ging iets mis in de neurale verwerking. Probeer het nogmaals.", 
            analysis: { 
                process_phases: [],
                coregulation_bands: [],
                task_densities: [],
                secondary_dimensions: [],
                reasoning: "JSON Error - Fallback triggered by Malformed Output", 
                active_fix: null,
                task_density_balance: 50,
                epistemic_status: "ONBEKEND",
                cognitive_mode: "ONBEKEND",
                current_profile: {}
            } 
        };
    }

    return {
      text: parsed.conversational_response,
      analysis: parsed.analysis,
      mechanical: mechanical
    };

  } catch (error) {
    console.error("Gemini Failure:", error);
    throw error;
  }
};
