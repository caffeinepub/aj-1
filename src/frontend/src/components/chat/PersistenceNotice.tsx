import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { useI18n } from '../../i18n/useI18n';
import { useGetUserSettings } from '../../hooks/useQueries';
import { Language } from '../../backend';

export default function PersistenceNotice() {
  const { data: settings } = useGetUserSettings();
  const language = settings?.language || Language.en_US;
  const { t } = useI18n(language);

  return (
    <Alert className="mb-4">
      <Info className="h-4 w-4" />
      <AlertDescription>{t('sessionOnlyNotice')}</AlertDescription>
    </Alert>
  );
}
