import { Language } from '../backend';
import { ExplanationLevel, generateStructuredResponse, StructuredResponse } from './responseTemplates';
import { isSafePrompt, generateSafetyRefusal } from './safetyPolicy';
import { needsClarification, generateClarifyingQuestions } from './clarifyingQuestions';

export function processPrompt(
  prompt: string,
  language: Language,
  explanationLevel: number
): StructuredResponse {
  // Safety check first
  if (!isSafePrompt(prompt)) {
    return {
      sections: [
        {
          title: '⚠️ Safety Notice',
          content: generateSafetyRefusal(language),
        },
      ],
    };
  }

  // Check if clarification is needed
  if (needsClarification(prompt)) {
    return {
      sections: [
        {
          title: '❓ Need More Information',
          content: generateClarifyingQuestions(prompt, language),
        },
      ],
    };
  }

  // Generate structured response
  const level = Math.min(2, Math.max(0, explanationLevel)) as ExplanationLevel;
  return generateStructuredResponse(prompt, language, level);
}
