import { GoogleGenAI, Type, Schema, Content } from "@google/genai";
import { SYSTEM_INSTRUCTION_NL, SYSTEM_INSTRUCTION_EN } from "../constants";
import { EAIAnalysis, MechanicalState, LearnerProfile } from "../types";

let genAI: GoogleGenAI | null = null;
let currentLanguage: 'nl' | 'en' = 'nl';

// ADAPTIVE COMPUTE MODELS
const MODEL_SMART = 'gemini-3-pro-preview';
const MODEL_FAST = 'gemini-2.5-flash';

// Threshold: Short messages use Fast model, Complex ones use Smart model
const COMPLEXITY_THRESHOLD = 60; 

// Temperature setting
const TEMPERATURE = 0.7;

// Manual History Management (Required for model swapping)
let chatHistory: Content[] = [];

export const initializeGemini = () => {
  if (!process.env.API_KEY) {
    console.error("API_KEY is missing in environment variables.");
    return;
  }
  genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const resetChatSession = () => {
    chatHistory = [];
};

// Define the schema for the structured response
const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    conversational_response: {
      type: Type.STRING,
      description: "The direct response to the user acting as the Learning Coach.",
    },
    analysis: {
      type: Type.OBJECT,
      description: "The EAI architectural analysis of the current turn.",
      properties: {
        process_phases: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "The detected Process Phases (P0-P5).",
        },
        coregulation_bands: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "The Co-regulation Bands (C0-C5) detected.",
        },
        task_densities: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "The Task Density Bands (TD0-TD5).",
        },
        secondary_dimensions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Any other detected bands from the SSOT (V0-V5, T0-T4, E0-E4, L0-L4).",
        },
        active_fix: {
          type: Type.STRING,
          description: "The command ID of the fix applied, or 'NONE'.",
          nullable: true,
        },
        reasoning: {
          type: Type.STRING,
          description: "Brief rationale explaining SSOT mapping (selection rationale).",
        },
        current_profile: {
          type: Type.OBJECT,
          description: "The accumulated learner profile context.",
          properties: {
            name: { type: Type.STRING, nullable: true },
            subject: { type: Type.STRING, nullable: true },
            level: { type: Type.STRING, nullable: true },
            grade: { type: Type.STRING, nullable: true },
          }
        },
        task_density_balance: {
            type: Type.NUMBER,
            description: "Score 0 (AI) to 100 (Learner)."
        },
        epistemic_status: {
            type: Type.STRING,
            enum: ['FEIT', 'INTERPRETATIE', 'SPECULATIE', 'ONBEKEND'],
            description: "Nature of knowledge."
        },
        cognitive_mode: {
            type: Type.STRING,
            enum: ['ANALYTISCH', 'REFLECTIEF', 'SYSTEMISCH', 'PRAGMATISCH', 'CREATIEF', 'NORMATIEF', 'ONBEKEND'],
            description: "Thinking style."
        }
      },
      required: ["process_phases", "coregulation_bands", "task_densities", "secondary_dimensions", "reasoning", "current_profile", "task_density_balance", "epistemic_status", "cognitive_mode"],
    },
  },
  required: ["conversational_response", "analysis"],
};

// Heuristic to choose model
const selectModel = (message: string): string => {
    // 1. If it's a command (starts with / or GAME_), always use SMART for accurate handling
    if (message.startsWith('/') || message.includes('GAME_')) return MODEL_SMART;
    
    // 2. If it's very short, use FAST
    if (message.length < COMPLEXITY_THRESHOLD) return MODEL_FAST;

    // 3. Default to SMART for quality
    return MODEL_SMART;
};

export const sendMessageToGemini = async (message: string, lang: 'nl' | 'en' = 'nl'): Promise<{ text: string; analysis: EAIAnalysis; mechanical: MechanicalState }> => {
  if (!genAI) {
    initializeGemini();
  }
  
  if (!genAI) {
    throw new Error("Failed to initialize GoogleGenAI. Check API Key.");
  }

  // Handle language switch reset if needed
  if (currentLanguage !== lang) {
      chatHistory = [];
      currentLanguage = lang;
  }

  const selectedModelName = selectModel(message);
  
  // Configure Thinking Budget only for the Pro model
  // Flash 2.5 supports thinking but we keep it off for speed in "Fast" mode
  const thinkingConfig = selectedModelName === MODEL_SMART 
    ? { thinkingBudget: 8192 } 
    : undefined;

  const systemInstruction = lang === 'en' ? SYSTEM_INSTRUCTION_EN : SYSTEM_INSTRUCTION_NL;

  try {
    const startTime = Date.now();

    // Prepare full history for this turn
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
            thinkingConfig: thinkingConfig
        }
    });

    const endTime = Date.now();
    const latency = endTime - startTime;

    const responseText = response.text;
    if (!responseText) {
       throw new Error("Empty response from Gemini");
    }

    // Update History
    chatHistory.push({ role: 'user', parts: [{ text: message }] });
    chatHistory.push({ role: 'model', parts: [{ text: responseText }] });

    const usage = response.usageMetadata || { promptTokenCount: 0, candidatesTokenCount: 0 };

    // Mechanical State (now includes dynamic model name)
    const mechanical: MechanicalState = {
        latencyMs: latency,
        inputTokens: usage.promptTokenCount || 0,
        outputTokens: usage.candidatesTokenCount || 0,
        model: selectedModelName, 
        temperature: TEMPERATURE,
        timestamp: new Date()
    };

    // Parse Response
    try {
      const parsed = JSON.parse(responseText);
      
      const profile: LearnerProfile = {
        name: parsed.analysis.current_profile?.name || null,
        subject: parsed.analysis.current_profile?.subject || null,
        level: parsed.analysis.current_profile?.level || null,
        grade: parsed.analysis.current_profile?.grade || null,
      };

      const analysisData: EAIAnalysis = {
        process_phases: parsed.analysis.process_phases || [],
        coregulation_bands: parsed.analysis.coregulation_bands || [],
        task_densities: parsed.analysis.task_densities || [],
        secondary_dimensions: parsed.analysis.secondary_dimensions || [],
        active_fix: parsed.analysis.active_fix === 'NONE' ? null : parsed.analysis.active_fix,
        reasoning: parsed.analysis.reasoning || "No reasoning provided.",
        current_profile: profile,
        task_density_balance: parsed.analysis.task_density_balance ?? 50,
        epistemic_status: parsed.analysis.epistemic_status || 'ONBEKEND',
        cognitive_mode: parsed.analysis.cognitive_mode || 'ONBEKEND',
      };

      return {
        text: parsed.conversational_response,
        analysis: analysisData,
        mechanical: mechanical
      };
    } catch (e) {
      console.error("Failed to parse JSON response:", responseText);
      return {
        text: responseText, 
        analysis: {
            process_phases: ["Error"],
            coregulation_bands: ["Error"],
            task_densities: ["Error"],
            secondary_dimensions: [],
            active_fix: null,
            reasoning: "Raw parsing error.",
            current_profile: { name: null, subject: null, level: null, grade: null },
            task_density_balance: 50, 
            epistemic_status: 'ONBEKEND',
            cognitive_mode: 'ONBEKEND',
        },
        mechanical: mechanical
      };
    }

  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    throw error;
  }
};