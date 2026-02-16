import { ConversationMessage, Language } from '../../backend';
import { Card } from '@/components/ui/card';
import { ReactElement } from 'react';

interface MessageBubbleProps {
  message: ConversationMessage;
  language: Language;
}

function SimpleMarkdown({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: ReactElement[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Heading
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="mb-3 mt-4 text-lg font-semibold first:mt-0">
          {line.substring(3)}
        </h2>
      );
    }
    // Horizontal rule
    else if (line.trim() === '---') {
      elements.push(<hr key={key++} className="my-4 border-border" />);
    }
    // Bullet list item
    else if (line.trim().startsWith('- ')) {
      const items: string[] = [line.substring(2)];
      while (i + 1 < lines.length && lines[i + 1].trim().startsWith('- ')) {
        i++;
        items.push(lines[i].substring(2));
      }
      elements.push(
        <ul key={key++} className="mb-3 ml-4 list-disc space-y-1">
          {items.map((item, idx) => (
            <li key={idx} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
          ))}
        </ul>
      );
    }
    // Numbered list item
    else if (/^\d+\.\s/.test(line.trim())) {
      const items: string[] = [line.replace(/^\d+\.\s/, '')];
      while (i + 1 < lines.length && /^\d+\.\s/.test(lines[i + 1].trim())) {
        i++;
        items.push(lines[i].replace(/^\d+\.\s/, ''));
      }
      elements.push(
        <ol key={key++} className="mb-3 ml-4 list-decimal space-y-1">
          {items.map((item, idx) => (
            <li key={idx} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
          ))}
        </ol>
      );
    }
    // Empty line
    else if (line.trim() === '') {
      // Skip empty lines
      continue;
    }
    // Regular paragraph
    else {
      elements.push(
        <p key={key++} className="mb-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
      );
    }
  }

  return <div className="prose prose-sm dark:prose-invert max-w-none">{elements}</div>;
}

function formatInline(text: string): string {
  // Bold: **text**
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>');
  // Italic: *text* (but not ** which is bold)
  text = text.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
  return text;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <Card
        className={`max-w-[85%] ${
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-card'
        }`}
      >
        <div className="p-4">
          {isUser ? (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          ) : (
            <SimpleMarkdown content={message.content} />
          )}
        </div>
      </Card>
    </div>
  );
}
