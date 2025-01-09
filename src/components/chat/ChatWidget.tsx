import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ChatHeader } from './ChatHeader';
import { ErrorBoundary } from '../ErrorBoundary';
import { getChatResponse } from '../../lib/chat';

const INITIAL_MESSAGE = {
  id: '0',
  content: '¡Hola! Soy tu asistente emocional 24/7. ¿En qué puedo ayudarte hoy?',
  sender: 'ai' as const,
  timestamp: new Date()
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: input,
      sender: 'user' as const,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await getChatResponse(input, user?.id);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: response.message,
        sender: 'ai' as const,
        timestamp: new Date()
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.',
        sender: 'ai' as const,
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      ) : (
        <ErrorBoundary>
          <div className="bg-white rounded-lg shadow-xl w-96 max-h-[600px] flex flex-col">
            <ChatHeader onClose={() => setIsOpen(false)} />

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} {...message} />
              ))}
              
              {isTyping && (
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100" />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200" />
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            <ChatInput
              value={input}
              onChange={setInput}
              onSend={handleSend}
              disabled={isTyping}
            />
          </div>
        </ErrorBoundary>
      )}
    </div>
  );
}