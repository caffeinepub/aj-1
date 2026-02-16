import { useState, useEffect, useRef } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetUserSettings, useGetConversationHistory, useSaveConversationMessage, useClearConversationHistory } from '../../hooks/useQueries';
import { Language, ConversationMessage } from '../../backend';
import { useI18n } from '../../i18n/useI18n';
import { processPrompt } from '../../assistant/structuredResponse';
import MessageBubble from './MessageBubble';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Send, Trash2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import PersistenceNotice from './PersistenceNotice';

export default function ChatView() {
  const { identity } = useInternetIdentity();
  const { data: settings } = useGetUserSettings();
  const { data: persistedHistory = [] } = useGetConversationHistory();
  const saveMessage = useSaveConversationMessage();
  const clearHistory = useClearConversationHistory();

  const language = settings?.language || Language.en_US;
  const explanationLevel = Number(settings?.explanationLevel || BigInt(1));
  const { t } = useI18n(language);

  const [sessionMessages, setSessionMessages] = useState<ConversationMessage[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isAuthenticated = !!identity;
  const allMessages = isAuthenticated ? persistedHistory : sessionMessages;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [allMessages]);

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage: ConversationMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: BigInt(Date.now()),
    };

    setIsProcessing(true);
    setInput('');

    try {
      // Add user message
      if (isAuthenticated) {
        await saveMessage.mutateAsync(userMessage);
      } else {
        setSessionMessages(prev => [...prev, userMessage]);
      }

      // Generate assistant response
      const response = processPrompt(input.trim(), language, explanationLevel);
      const assistantContent = response.sections
        .map(section => `## ${section.title}\n\n${section.content}`)
        .join('\n\n---\n\n');

      const assistantMessage: ConversationMessage = {
        role: 'assistant',
        content: assistantContent,
        timestamp: BigInt(Date.now()),
      };

      if (isAuthenticated) {
        await saveMessage.mutateAsync(assistantMessage);
      } else {
        setSessionMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to process message');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClearHistory = async () => {
    try {
      if (isAuthenticated) {
        await clearHistory.mutateAsync();
      } else {
        setSessionMessages([]);
      }
      setShowClearDialog(false);
      toast.success('History cleared');
    } catch (error: any) {
      toast.error(error.message || 'Failed to clear history');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="container flex h-[calc(100vh-8rem)] max-w-4xl flex-col px-4 py-6">
      {/* Persistence Notice */}
      {!isAuthenticated && <PersistenceNotice />}

      {/* Messages Area */}
      <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
        {allMessages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
            <div className="rounded-full bg-primary/10 p-6">
              <Sparkles className="h-12 w-12 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{t('welcomeTitle')}</h2>
              <p className="max-w-md text-muted-foreground">{t('welcomeMessage')}</p>
            </div>
            {!isAuthenticated && (
              <p className="max-w-md text-sm text-muted-foreground">{t('signInPrompt')}</p>
            )}
          </div>
        ) : (
          <div className="space-y-6 pb-4">
            {allMessages.map((msg, idx) => (
              <MessageBubble key={idx} message={msg} language={language} />
            ))}
            {isProcessing && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: '0ms' }} />
                <div className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: '150ms' }} />
                <div className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: '300ms' }} />
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Input Area */}
      <div className="space-y-3 pt-4">
        {allMessages.length > 0 && (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowClearDialog(true)}
              className="gap-2 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              {t('clearHistory')}
            </Button>
          </div>
        )}
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('typeMessage')}
            className="min-h-[60px] resize-none"
            disabled={isProcessing}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isProcessing}
            size="icon"
            className="h-[60px] w-[60px] shrink-0"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Clear History Dialog */}
      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('clearHistory')}</AlertDialogTitle>
            <AlertDialogDescription>{t('clearHistoryConfirm')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearHistory}>{t('confirm')}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
