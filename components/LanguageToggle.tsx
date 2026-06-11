'use client';

import { Button } from '@/components/ui/button';

interface LanguageToggleProps {
  currentLanguage: 'hindi' | 'english' | 'dogri';
  onLanguageChange: (language: 'hindi' | 'english' | 'dogri') => void;
}

export default function LanguageToggle({ currentLanguage, onLanguageChange }: LanguageToggleProps) {
  const languages = [
    { code: 'english', label: 'EN' },
    { code: 'hindi', label: 'HI' },
    { code: 'dogri', label: 'DO' }
  ] as const;

  return (
    <div className="flex gap-1 bg-muted p-1 rounded-lg">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onLanguageChange(lang.code)}
          className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
            currentLanguage === lang.code
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          aria-label={`Switch to ${lang.code}`}
          aria-pressed={currentLanguage === lang.code}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
