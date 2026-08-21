"use client";
import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';
import './ChatAssistant.css';
import { findBestResponse } from './chatKnowledge';
import { useCMS } from '../context/CMSContext';

export default function ChatAssistant({ lang, t }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: t.chat.greeting, isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const bodyRef = useRef(null);
  
  const { addSubmission } = useCMS();
  const [leadState, setLeadState] = useState(null); // 'name', 'phone', 'done'
  const [leadData, setLeadData] = useState({ name: '', phone: '' });

  const defaultChips = [
    'Products & Services',
    'Business Opportunities',
    'Franchise Info',
    'Contact Sales'
  ];
  
  const [availableChips, setAvailableChips] = useState(t.chat.options || defaultChips);

  // Update greeting and chips when language changes
  useEffect(() => {
    const greeting = t.chat.greeting;
    setMessages(prev => prev.map((m, i) => (i === 0 ? { ...m, text: greeting } : m)));
    setAvailableChips(t.chat.options || defaultChips);
  }, [t.chat.greeting, t.chat.options]);

  // Auto-scroll to latest message
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Hide pulse notification after opening
  useEffect(() => {
    if (isOpen) setShowPulse(false);
  }, [isOpen]);

  const getBotResponse = (userMessage) => {
    return findBestResponse(userMessage);
  };

  const processLeadStep = (userMessage) => {
    if (leadState === 'name') {
      setLeadData(prev => ({ ...prev, name: userMessage }));
      setLeadState('phone');
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "Thank you. What is your phone or WhatsApp number?", isBot: true }]);
        setIsTyping(false);
      }, 600);
      return true;
    }
    
    if (leadState === 'phone') {
      const finalPhone = userMessage;
      setLeadState('done');
      
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "Thank you! Our sales team will reach out to you shortly.", isBot: true }]);
        setIsTyping(false);
        
        // Save lead
        addSubmission({
          name: leadData.name,
          email: 'chatbot@dorek.in', // dummy email for bots
          phone: finalPhone,
          subject: 'Chatbot Lead - Contact Sales',
          message: 'Lead generated via Chat Assistant.'
        });
        
        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: leadData.name,
            email: 'chatbot@dorek.in',
            phone: finalPhone,
            subject: 'Chatbot Lead - Contact Sales',
            message: 'Lead generated via Chat Assistant.'
          })
        }).catch(console.error);
        
      }, 800);
      return true;
    }
    return false;
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput('');
    setIsTyping(true);

    if (processLeadStep(userMessage)) return;

    const lower = userMessage.toLowerCase();
    if (lower.includes('contact sales') || lower.includes('contact') || lower.includes('call')) {
      setTimeout(() => {
        setLeadState('name');
        setMessages(prev => [...prev, { text: "Sure! I can help you connect with our sales team. May I know your name?", isBot: true }]);
        setIsTyping(false);
      }, 600);
      return;
    }

    // Simulate a small thinking delay
    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      const response = getBotResponse(userMessage);
      setMessages(prev => [...prev, { text: response, isBot: true }]);
      setIsTyping(false);
    }, delay);
  };

  const handleChipClick = (chip) => {
    setMessages(prev => [...prev, { text: chip, isBot: false }]);
    setAvailableChips(prev => prev.filter(c => c !== chip));
    setIsTyping(true);

    if (chip === 'Contact Sales' || chip === 'സെയിൽസ് ബന്ധപ്പെടുക') {
      setTimeout(() => {
        setLeadState('name');
        setMessages(prev => [...prev, { text: "Sure! I can help you connect with our sales team. May I know your name?", isBot: true }]);
        setIsTyping(false);
      }, 600);
      return;
    }

    setTimeout(() => {
      const response = getBotResponse(chip);
      setMessages(prev => [...prev, { text: response, isBot: true }]);
      setIsTyping(false);
    }, 800);
  };

  // Simple markdown-like renderer for bold text
  const renderText = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <>
      {!isOpen && (
        <button className="chat-fab" onClick={() => setIsOpen(true)} aria-label="Open Chat">
          <MessageSquare size={24} />
          {showPulse && <span className="chat-fab-pulse" />}
        </button>
      )}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">
                <Bot size={20} />
              </div>
              <div>
                <h4>{t.chat.title}</h4>
                <span className="chat-online-status">
                  <span className="chat-online-dot" />
                  {t.chat.online}
                </span>
              </div>
            </div>
            <button className="chat-close" onClick={() => setIsOpen(false)} aria-label="Close Chat">
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="chat-body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.isBot ? 'bot' : 'user'}`}>
                {m.isBot && (
                  <div className="chat-bubble-icon">
                    <Sparkles size={12} />
                  </div>
                )}
                <div className="chat-bubble-text">
                  {m.text.split('\n').map((line, j) => (
                    <span key={j}>
                      {renderText(line)}
                      {j < m.text.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="chat-bubble bot typing-bubble">
                <div className="chat-bubble-icon">
                  <Sparkles size={12} />
                </div>
                <div className="typing-indicator">
                  <span /><span /><span />
                </div>
              </div>
            )}

            {/* Quick Reply Chips — show available chips always unless typing */}
            {availableChips.length > 0 && !isTyping && (
              <div className="chat-chips">
                {availableChips.map((chip, i) => (
                  <button key={i} className="chat-chip" onClick={() => handleChipClick(chip)}>
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form className="chat-input" onSubmit={handleSend}>
            <input
              type="text"
              placeholder={t.chat.placeholder}
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={isTyping}
            />
            <button type="submit" disabled={isTyping || !input.trim()} aria-label="Send Message">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

