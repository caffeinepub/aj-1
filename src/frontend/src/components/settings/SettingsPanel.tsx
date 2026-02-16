import { useGetUserSettings, useSaveUserSettings } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useI18n } from '../../i18n/useI18n';
import { SUPPORTED_LANGUAGES } from '../../i18n/supportedLanguages';
import { Language } from '../../backend';
import { toast } from 'sonner';

interface SettingsPanelProps {
  onClose: () => void;
}

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { data: settings, isLoading } = useGetUserSettings();
  const saveSettings = useSaveUserSettings();
  
  const language = settings?.language || Language.en_US;
  const explanationLevel = settings?.explanationLevel || BigInt(1);
  const { t } = useI18n(language);

  const handleLanguageChange = async (newLanguage: string) => {
    if (!settings) return;
    try {
      await saveSettings.mutateAsync({
        ...settings,
        language: newLanguage as Language,
      });
      toast.success('Language updated');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update language');
    }
  };

  const handleLevelChange = async (newLevel: string) => {
    if (!settings) return;
    try {
      await saveSettings.mutateAsync({
        ...settings,
        explanationLevel: BigInt(newLevel),
      });
      toast.success('Explanation level updated');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update explanation level');
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 py-4">
      <SheetHeader>
        <SheetTitle className="text-2xl">{t('settings')}</SheetTitle>
      </SheetHeader>

      <Separator />

      <div className="space-y-6">
        {/* Language Selection */}
        <div className="space-y-3">
          <Label htmlFor="language" className="text-base font-semibold">
            {t('language')}
          </Label>
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger id="language">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.nativeLabel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Explanation Level */}
        <div className="space-y-3">
          <Label htmlFor="level" className="text-base font-semibold">
            {t('explanationLevel')}
          </Label>
          <Select value={explanationLevel.toString()} onValueChange={handleLevelChange}>
            <SelectTrigger id="level">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">{t('beginner')}</SelectItem>
              <SelectItem value="1">{t('student')}</SelectItem>
              <SelectItem value="2">{t('expert')}</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            {explanationLevel === BigInt(0) && 'Simple explanations with foundational concepts'}
            {explanationLevel === BigInt(1) && 'Balanced explanations with practical examples'}
            {explanationLevel === BigInt(2) && 'Advanced explanations with technical depth'}
          </p>
        </div>
      </div>

      <Separator />

      <Button onClick={onClose} variant="outline" className="w-full">
        {t('close')}
      </Button>
    </div>
  );
}
