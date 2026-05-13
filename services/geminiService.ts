
import { GoogleGenAI, Modality, Type } from "@google/genai";

/**
 * Tutor con Google Search Grounding para noticias y sentencias reales
 */
export const getLegalExplanation = async (userPrompt: string, context: string) => {
  try {
    // Guideline: Create a new GoogleGenAI instance right before making an API call to ensure it always uses the most up-to-date API key.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Actúa como un catedrático experto en Derecho Venezolano. 
      Responde a la duda técnica basándote en la legislación venezolana vigente y eventos recientes.
      Contexto: ${context}
      Pregunta: ${userPrompt}
      
      Reglas:
      1. Cita artículos y sentencias específicas.
      2. Si usas información de la web, indica la fuente.
      3. No menciones universidades específicas.`,
      config: {
        tools: [{ googleSearch: {} }] // Habilita búsqueda en tiempo real
      }
    });
    
    // Extraemos URLs de grounding si existen para mostrarlas en la UI
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    let text = response.text || "";
    
    if (sources.length > 0) {
      text += "\n\n**Fuentes de consulta externa:**\n";
      sources.forEach((chunk: any) => {
        if (chunk.web?.uri) {
          text += `- [${chunk.web.title || 'Ver fuente'}](${chunk.web.uri})\n`;
        }
      });
    }

    return text;
  } catch (error) {
    console.error("Error fetching legal explanation:", error);
    return "Error en el sistema de tutoría. Intenta de nuevo.";
  }
};

/**
 * Generate practical legal cases using structured JSON output
 */
export const generateMoreQuestions = async (subject: string) => {
  try {
    // Guideline: Create a new GoogleGenAI instance right before making an API call to ensure it always uses the most up-to-date API key.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Genera 3 casos prácticos de Derecho Venezolano sobre "${subject}".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              enunciado: { type: Type.STRING, description: "El planteamiento del caso práctico." },
              opciones: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING, description: "Identificador de la opción (a, b, c, d)." },
                    texto: { type: Type.STRING, description: "Texto descriptivo de la opción legal." }
                  },
                  required: ["id", "texto"]
                }
              },
              respuestaCorrecta: { type: Type.STRING, description: "El ID de la opción correcta." },
              feedback: { type: Type.STRING, description: "Explicación jurídica basada en la ley venezolana." },
              tema: { type: Type.STRING, description: "Subtema legal específico." },
              dificultad: { type: Type.STRING, description: "Nivel de dificultad (Fácil, Media, Alta)." }
            },
            required: ["enunciado", "opciones", "respuestaCorrecta", "feedback", "tema", "dificultad"]
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Error generating cases:", error);
    return [];
  }
};

export const generateSpeech = async (text: string) => {
  try {
    // Guideline: Create a new GoogleGenAI instance right before making an API call to ensure it always uses the most up-to-date API key.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Lee con tono formal jurídico: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (error) {
    return null;
  }
};

export function decodeBase64(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

/**
 * Genera un escenario de crimen con prompt para imagen
 */
export const generateCrimeSceneData = async () => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Actúa como un experto forense y profesor de derecho penal venezolano.
      Genera un caso práctico visual para identificar evidencia clave en una escena del crimen.
      
      Salida JSON requerida:
      {
        "title": "Título del Caso (Corto)",
        "description": "Contexto breve del crimen (máx 2 líneas).",
        "imagePrompt": "Prompt visual detallado en inglés para generar una imagen realista de la escena del crimen (photorealistic, 8k, crime scene, evidence visible).",
        "question": "Pregunta directa sobre qué evidencia es clave.",
        "options": [
          { "id": "a", "text": "Opción 1", "isCorrect": boolean, "feedback": "Explicación forense/legal basada en el COPP o Código Penal." },
          ... (4 opciones en total, solo 1 correcta)
        ]
      }`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            imagePrompt: { type: Type.STRING },
            question: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  text: { type: Type.STRING },
                  isCorrect: { type: Type.BOOLEAN },
                  feedback: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Error generating crime scene:", error);
    return null;
  }
};
