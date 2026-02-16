import { SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useI18n } from '../../i18n/useI18n';
import { useGetUserSettings } from '../../hooks/useQueries';
import { Language } from '../../backend';
import { SUPPORTED_LANGUAGES } from '../../i18n/supportedLanguages';
import AJ1Brand from '../brand/AJ1Brand';
import { Shield, Globe, Smartphone } from 'lucide-react';

interface AboutPanelProps {
  onClose: () => void;
}

export default function AboutPanel({ onClose }: AboutPanelProps) {
  const { data: settings } = useGetUserSettings();
  const language = settings?.language || Language.en_US;
  const { t } = useI18n(language);

  return (
    <div className="flex flex-col gap-6 py-4">
      <SheetHeader>
        <SheetTitle className="text-2xl">{t('aboutTitle')}</SheetTitle>
      </SheetHeader>

      <div className="flex justify-center py-4">
        <AJ1Brand showLogo showIcon />
      </div>

      <Separator />

      <div className="space-y-6">
        {/* About Description */}
        <div className="space-y-2">
          <p className="text-sm leading-relaxed text-foreground">
            {t('aboutDescription')}
          </p>
        </div>

        <Separator />

        {/* Supported Languages */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">{t('supportedLanguages')}</h3>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <div key={lang.code} className="rounded-md bg-muted px-3 py-2">
                {lang.nativeLabel}
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Safety & Ethics */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">{t('safetyTitle')}</h3>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t('safetyDescription')}
          </p>
        </div>

        <Separator />

        {/* APK Notice */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">{t('apkNotice')}</h3>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t('apkDescription')}
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
