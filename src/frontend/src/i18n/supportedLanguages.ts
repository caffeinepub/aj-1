import { Language } from '../backend';

export const SUPPORTED_LANGUAGES = [
  { code: Language.en_US, label: 'English', nativeLabel: 'English' },
  { code: Language.de_DE, label: 'German', nativeLabel: 'Deutsch' },
  { code: Language.es_ES, label: 'Spanish', nativeLabel: 'Español' },
  { code: Language.fr_FR, label: 'French', nativeLabel: 'Français' },
  { code: Language.pt_PT, label: 'Portuguese', nativeLabel: 'Português' },
  { code: Language.it_IT, label: 'Italian', nativeLabel: 'Italiano' },
  { code: Language.ru_RU, label: 'Russian', nativeLabel: 'Русский' },
  { code: Language.ja_JP, label: 'Japanese', nativeLabel: '日本語' },
  { code: Language.zh_CN, label: 'Chinese', nativeLabel: '中文' },
  { code: Language.ko_KR, label: 'Korean', nativeLabel: '한국어' },
] as const;

export function getLanguageLabel(code: Language): string {
  const lang = SUPPORTED_LANGUAGES.find(l => l.code === code);
  return lang?.nativeLabel || 'English';
}
