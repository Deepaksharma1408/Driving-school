import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '../../types';

interface AccordionProps {
  items: FAQItem[];
  defaultOpenIndex?: number;
}

export const Accordion: React.FC<AccordionProps> = ({ items, defaultOpenIndex = 0 }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion-wrapper">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={item.id || index} 
            className={`accordion-item aura-card ${isOpen ? 'is-open' : ''}`}
          >
            <button 
              className="accordion-trigger" 
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
            >
              <span className="accordion-question">{item.question}</span>
              <span className={`accordion-chevron ${isOpen ? 'rotate' : ''}`}>
                <ChevronDown size={20} />
              </span>
            </button>

            {isOpen && (
              <div className="accordion-body">
                <p className="accordion-answer">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}

      <style>{`
        .accordion-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          width: 100%;
        }
        .accordion-item {
          background: #FFFFFF;
          border-radius: var(--radius-lg);
          padding: 0;
          border: 1px solid var(--border-light);
          transition: all 0.2s ease;
        }
        .accordion-item.is-open {
          border-color: var(--border-medium);
          box-shadow: var(--shadow-sm);
        }
        .accordion-trigger {
          width: 100%;
          padding: 1.4rem 1.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: left;
          gap: 1rem;
        }
        .accordion-question {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.05rem;
          color: var(--text-primary);
        }
        .accordion-chevron {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--bg-surface-alt);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease;
          flex-shrink: 0;
        }
        .accordion-chevron.rotate {
          transform: rotate(180deg);
          background: var(--accent-primary);
        }
        .accordion-body {
          padding: 0 1.75rem 1.5rem 1.75rem;
          animation: fadeIn 0.25s ease-in-out;
        }
        .accordion-answer {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
