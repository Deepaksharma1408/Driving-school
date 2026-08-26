import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Car, 
  CheckCircle2, 
  MessageSquare,
  ChevronDown
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export const AIChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: 'G\'day! I am your 24/7 AI Driving Instructor Assistant. Ask me anything about NSW driving lessons, Service NSW test centres, logbook credits, or pricing!',
      timestamp: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // AI Response Engine Logic
    setTimeout(() => {
      let botResponseText = "Thanks for asking! Our NSW certified instructors provide 1-on-1 dual control lesson packages across Sydney test centres. You can book online in 2 minutes at /book or call us directly.";
      const lower = query.toLowerCase();

      if (lower.includes('how many lessons') || lower.includes('kitne lessons') || lower.includes('lessons needed')) {
        botResponseText = "Most beginner learners in NSW need 5 to 10 structured instructor lessons combined with private practice. Remember that 10 instructor hours equal 30 logbook credit hours (3-for-1 bonus rule)!";
      } else if (lower.includes('botany') || lower.includes('marrickville') || lower.includes('test centre') || lower.includes('preparation')) {
        botResponseText = "Service NSW test centres like Botany and Marrickville evaluate kerbside stops, parallel parking, and 3-point turns. We offer a 'Warmup + Car Hire' package where your instructor conducts a mock test on the exact test route right before your test!";
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('package') || lower.includes('fees')) {
        botResponseText = "Standard 1-hour driving lessons are $95. Our popular 3-Lesson Combo is $270, and Test Day Car Hire + Warmup is $220. Check our /services page for all package details!";
      } else if (lower.includes('logbook') || lower.includes('hours') || lower.includes('3 for 1') || lower.includes('3-for-1')) {
        botResponseText = "Under Transport for NSW rules, 1 hour with a licensed Canguruber instructor equals 3 logbook hours! You can credit up to 30 hours towards your 120-hour logbook requirement. Try our interactive calculator at /logbook!";
      } else if (lower.includes('book') || lower.includes('appointment') || lower.includes('schedule')) {
        botResponseText = "You can instantly reserve your preferred date, time slot, and test centre using our online booking wizard at /book!";
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)} 
          className="ai-chat-toggle-btn"
          title="Ask AI Driving Instructor"
        >
          <div className="bot-icon-badge">
            <Bot size={22} />
          </div>
          <span className="toggle-text">AI Instructor Chat</span>
          <span className="online-dot" />
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="ai-chat-window aura-card dark-theme">
          {/* Header */}
          <div className="chat-header">
            <div className="bot-info">
              <div className="header-bot-avatar">
                <Bot size={20} />
              </div>
              <div>
                <strong className="header-title">AI Driving Instructor</strong>
                <span className="online-badge">● Online 24/7 • Instant Answers</span>
              </div>
            </div>

            <button onClick={() => setIsOpen(false)} className="chat-close-btn" aria-label="Close Chat">
              <X size={18} />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="chat-messages-feed">
            {messages.map((m) => (
              <div key={m.id} className={`chat-bubble-row ${m.sender}`}>
                <div className="chat-bubble">
                  <p>{m.text}</p>
                  <span className="time-stamp">{m.timestamp}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-bubble-row bot">
                <div className="chat-bubble typing">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Questions */}
          <div className="chat-quick-suggestions">
            <button onClick={() => handleSend("How many lessons do I need?")}>
              💡 How many lessons do I need?
            </button>
            <button onClick={() => handleSend("How does 3-for-1 logbook credit work?")}>
              ⚡ 3-for-1 Logbook Credit
            </button>
            <button onClick={() => handleSend("Test Day Car Hire pricing")}>
              🚗 Test Day Car Hire
            </button>
          </div>

          {/* Input Bar */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
            className="chat-input-bar"
          >
            <input 
              type="text" 
              placeholder="Ask a question..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="chat-input"
            />
            <button type="submit" className="chat-send-btn" aria-label="Send Message">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <style>{`
        .ai-chat-toggle-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 999;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: #07131D;
          color: #FFFFFF;
          padding: 0.75rem 1.15rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(210, 176, 76, 0.4);
          box-shadow: 0 10px 30px rgba(7, 19, 29, 0.3);
          cursor: pointer;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.85rem;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .ai-chat-toggle-btn:hover {
          transform: translateY(-4px) scale(1.04);
          border-color: var(--accent-gold);
          box-shadow: 0 14px 35px rgba(7, 19, 29, 0.45);
        }
        .bot-icon-badge {
          color: var(--accent-gold);
          display: flex;
          align-items: center;
        }
        .online-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22C55E;
        }

        .ai-chat-window {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1000;
          width: 360px;
          height: 480px;
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          animation: chatWindowPop 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes chatWindowPop {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 480px) {
          .ai-chat-window {
            width: calc(100vw - 32px);
            right: 16px;
            bottom: 16px;
            height: 440px;
          }
        }

        .chat-header {
          padding: 1rem 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .bot-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .header-bot-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(210, 176, 76, 0.2);
          color: var(--accent-gold);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .header-title {
          font-size: 0.95rem;
          color: #FFFFFF;
          display: block;
        }
        .online-badge {
          font-size: 0.7rem;
          color: #22C55E;
          display: block;
        }
        .chat-close-btn {
          background: transparent;
          border: none;
          color: #94A3B8;
          cursor: pointer;
          padding: 0.25rem;
        }
        .chat-close-btn:hover { color: #FFFFFF; }

        .chat-messages-feed {
          flex: 1;
          padding: 1rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .chat-bubble-row {
          display: flex;
        }
        .chat-bubble-row.user { justify-content: flex-end; }
        .chat-bubble-row.bot { justify-content: flex-start; }

        .chat-bubble {
          max-width: 82%;
          padding: 0.75rem 1rem;
          border-radius: 14px;
          font-size: 0.85rem;
          line-height: 1.45;
        }
        .chat-bubble-row.user .chat-bubble {
          background: var(--accent-gold);
          color: #07131D;
          border-bottom-right-radius: 2px;
          font-weight: 600;
        }
        .chat-bubble-row.bot .chat-bubble {
          background: rgba(255, 255, 255, 0.08);
          color: #F1F5F9;
          border-bottom-left-radius: 2px;
        }
        .time-stamp {
          display: block;
          font-size: 0.65rem;
          opacity: 0.7;
          margin-top: 0.25rem;
          text-align: right;
        }

        .chat-quick-suggestions {
          padding: 0.5rem 0.85rem;
          display: flex;
          gap: 0.4rem;
          overflow-x: auto;
          background: rgba(0, 0, 0, 0.2);
        }
        .chat-quick-suggestions button {
          white-space: nowrap;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.3rem 0.65rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #CBD5E1;
          cursor: pointer;
          transition: all 0.2s;
        }
        .chat-quick-suggestions button:hover {
          background: var(--accent-gold);
          color: #07131D;
        }

        .chat-input-bar {
          padding: 0.75rem 1rem;
          background: rgba(0, 0, 0, 0.3);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .chat-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-full);
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
          color: #FFFFFF;
          outline: none;
        }
        .chat-send-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: var(--accent-gold);
          color: #07131D;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .typing-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #94A3B8;
          margin: 0 2px;
          animation: typingBounce 1.4s infinite ease-in-out both;
        }
        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes typingBounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </>
  );
};
