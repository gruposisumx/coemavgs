import React from 'react';
import { Bot, User } from 'lucide-react';

interface Props {
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export function ChatMessage({ content, sender, timestamp }: Props) {
  return (
    <div className={`flex items-start gap-2 ${sender === 'user' ? 'flex-row-reverse' : ''}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        sender === 'ai' ? 'bg-primary-100' : 'bg-secondary-100'
      }`}>
        {sender === 'ai' ? (
          <Bot className="w-5 h-5 text-primary-600" />
        ) : (
          <User className="w-5 h-5 text-secondary-600" />
        )}
      </div>

      <div className={`max-w-[80%] rounded-lg p-3 ${
        sender === 'user'
          ? 'bg-secondary-600 text-white'
          : 'bg-gray-100 text-gray-800'
      }`}>
        {content}
      </div>
    </div>
  );
}