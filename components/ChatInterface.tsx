'use client';

import { useState, useRef, useEffect } from 'react';
import { detectLanguage, getLanguagePreference } from '@/lib/language';
import { getResponseByQuery } from '@/lib/knowledgeBase';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import LanguageToggle from './LanguageToggle';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  language: 'hindi' | 'english' | 'dogri';
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'नमस्ते! मैं आपका पहली उड़ान सहायक हूँ। क्या मैं आपकी कोई मदद कर सकता हूँ? / Hello! I&apos;m your first-time flight assistant. How can I help you? / नमस्ते! मैं तुहाडा पहली उड़ान सहायक छां।',
      language: 'hindi'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'hindi' | 'english' | 'dogri'>('english');
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Detect language from user input
    const detectedLang = detectLanguage(text);
    const langPref = getLanguagePreference(text);
    const finalLanguage = langPref || detectedLang || currentLanguage;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      language: finalLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setShowWelcome(false);
    setIsLoading(true);

    // Simulate API call to get response
    await new Promise(resolve => setTimeout(resolve, 800));

    // Get response from knowledge base
    const response = getResponseByQuery(text, finalLanguage);
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response || `मुझे खेद है, मुझे इस सवाल का जवाब नहीं पता। कृपया बैगेज, दस्तावेज, या उड़ान बुकिंग के बारे में पूछें। / I&apos;m sorry, I don&apos;t have an answer to that question. Please ask about baggage, documents, or flight booking.`,
      language: finalLanguage
    };

    setMessages(prev => [...prev, assistantMessage]);
    setCurrentLanguage(finalLanguage);
    setIsLoading(false);
  };

  return (
    <section className="w-full bg-white border-t border-gray-200" aria-label="Chat Assistant">
      <div className="max-w-2xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-lg font-semibold text-primary">Udaan-Mitra</h2>
            <p className="text-xs text-muted-foreground">Your Flight Assistant</p>
          </div>
          <LanguageToggle
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
          />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {showWelcome && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">✈️</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">स्वागत है | Welcome</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                आपकी पहली उड़ान के लिए आपका विश्वस्त गाइड। अपने सवाल पूछें। / Your trusted guide for your first flight. Ask your questions.
              </p>
            </div>
          )}

          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {isLoading && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
              <div className="text-sm text-muted-foreground">सोच रहे हैं... / Thinking...</div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}
