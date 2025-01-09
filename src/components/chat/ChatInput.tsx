import React from 'react';
import { Send } from 'lucide-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export function ChatInput({ value, onChange, onSend, disabled }: Props) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex gap-2 p-4 border-t">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Escribe tu mensaje..."
        disabled={disabled}
        className="flex-1 rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50"
      />
      <button
        onClick={onSend}
        disabled={disabled || !value.trim()}
        className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 disabled:opacity-50"
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
}