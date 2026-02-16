import { useMemo } from 'react';
import { translations } from './translations';
import { Language } from '../backend';

export function useI18n(language: Language) {
  const t = useMemo(() => {
    const dict = translations[language] || translations[Language.en_US];
    return (key: keyof typeof dict): string => dict[key];
  }, [language]);

  return { t, language };
}
