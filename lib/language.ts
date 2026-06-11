export function detectLanguage(text: string): 'hindi' | 'english' | 'dogri' {
  const hindiChars = /[\u0900-\u097F]/g;
  const hindiMatches = text.match(hindiChars) || [];
  
  // If more than 20% of the text contains Devanagari script, treat as Hindi/Dogri
  if (hindiMatches.length > text.length * 0.2) {
    // For now, treat all Devanagari as Hindi
    // In a real app, we'd need more sophisticated detection for Dogri
    return 'hindi';
  }
  
  // Check for English keywords in lowercase
  const englishPatterns = /hello|hi|help|power|baggage|documents|flight|cab|airport/i;
  if (englishPatterns.test(text)) {
    return 'english';
  }
  
  return 'english'; // Default to English
}

export function isLanguageQuery(text: string): boolean {
  const languageKeywords = /language|भाषा|language|switch|बदल/i;
  return languageKeywords.test(text);
}

export function getLanguagePreference(text: string): 'hindi' | 'english' | 'dogri' | null {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('hindi') || lowerText.includes('हिंदी') || lowerText.includes('hirangi')) {
    return 'hindi';
  }
  if (lowerText.includes('english') || lowerText.includes('अंग्रेजी')) {
    return 'english';
  }
  if (lowerText.includes('dogri') || lowerText.includes('डोगरी')) {
    return 'dogri';
  }
  
  return null;
}
