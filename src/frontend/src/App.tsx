import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import AppLayout from './components/layout/AppLayout';
import ChatView from './components/chat/ChatView';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AppLayout>
        <ChatView />
      </AppLayout>
      <Toaster />
    </ThemeProvider>
  );
}
