import { IAIService } from './ports';
import { GeminiAdapter } from '../services/geminiService';

export class AIServiceFactory {
  static create(provider: 'gemini' | 'openai' = 'gemini'): IAIService {
    switch (provider) {
      case 'gemini':
        return new GeminiAdapter();
      // case 'openai': return new OpenAIAdapter();
      default:
        throw new Error('Provider no soportado');
    }
  }
}