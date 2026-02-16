import { ReactNode, useState } from 'react';
import { Menu, Settings as SettingsIcon, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import AJ1Brand from '../brand/AJ1Brand';
import LoginButton from '../auth/LoginButton';
import SettingsPanel from '../settings/SettingsPanel';
import AboutPanel from '../about/AboutPanel';
import { useI18n } from '../../i18n/useI18n';
import { useGetUserSettings } from '../../hooks/useQueries';
import { Language } from '../../backend';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  
  const { data: settings } = useGetUserSettings();
  const language = settings?.language || Language.en_US;
  const { t } = useI18n(language);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="flex flex-col gap-4 py-4">
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => setSettingsOpen(true)}
                  >
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    {t('settings')}
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => setAboutOpen(true)}
                  >
                    <Info className="mr-2 h-4 w-4" />
                    {t('about')}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <AJ1Brand showLogo showIcon className="hidden sm:flex" />
            <AJ1Brand showIcon className="flex sm:hidden" />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={() => setSettingsOpen(true)}
            >
              <SettingsIcon className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={() => setAboutOpen(true)}
            >
              <Info className="h-5 w-5" />
            </Button>
            <LoginButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30 py-6">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>
            {t('footerAttribution')}{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          <p className="mt-1 text-xs">© {new Date().getFullYear()} AJ.1</p>
        </div>
      </footer>

      {/* Settings Dialog */}
      <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SettingsPanel onClose={() => setSettingsOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* About Dialog */}
      <Sheet open={aboutOpen} onOpenChange={setAboutOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <AboutPanel onClose={() => setAboutOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
