import React from 'react';
import { ChatMessage, Sender } from '../types';
import FormattedMessage from './FormattedMessage';
import TypingIndicator from './TypingIndicator';
import CodeDisplay from './CodeDisplay'; // Importar CodeDisplay

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const parseCodeBlock = (text: string) => {
    const codeBlockRegex = /```(html|css|javascript|typescript|python|json|markdown|bash|text)\n([\s\S]*?)\n```/g;
    const matches = [...text.matchAll(codeBlockRegex)];

    if (matches.length > 0) {
      const parts = [];
      let lastIndex = 0;

      matches.forEach(match => {
        const [fullMatch, language, code] = match;
        const startIndex = match.index;
        const endIndex = startIndex + fullMatch.length;

        // Add text before the code block
        if (startIndex > lastIndex) {
          parts.push({ type: 'text', content: text.substring(lastIndex, startIndex) });
        }

        // Add the code block
        parts.push({ type: 'code', language, code });
        lastIndex = endIndex;
      });

      // Add any remaining text after the last code block
      if (lastIndex < text.length) {
        parts.push({ type: 'text', content: text.substring(lastIndex) });
      }
      return parts;
    }
    return [{ type: 'text', content: text }];
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender === Sender.User ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[95%] p-3 rounded-lg shadow-md ${message.sender === Sender.User
                ? 'bg-blue-600 text-white' : 'bg-zinc-700 text-white'}
            `}
          >
            {message.sender === Sender.AI && <strong className="block mb-1">Bot</strong>}
            {message.sender === Sender.User && <strong className="block mb-1">Tú</strong>}
            {message.imageUrl && (
              <img src={message.imageUrl} alt="Generated" className="max-w-full h-auto rounded-lg mb-2" />
            )}
            {parseCodeBlock(message.text).map((part, index) => (
              part.type === 'text' ? (
                <FormattedMessage key={index} text={part.content} />
              ) : (
                <CodeDisplay key={index} code={part.code} language={part.language} />
              )
            ))}
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="max-w-[95%] p-3 rounded-lg shadow-md bg-zinc-700 text-white">
            <TypingIndicator />
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;


