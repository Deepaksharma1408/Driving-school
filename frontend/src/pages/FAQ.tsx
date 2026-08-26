import React, { useState } from 'react';
import { Search, HelpCircle, MessageSquare, ArrowRight } from 'lucide-react';
import { FAQS } from '../data/content';
import { PageHeader } from '../components/layout/PageHeader';
import { Accordion } from '../components/ui/Accordion';
import { Button } from '../components/ui/Button';

export const FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'lessons', label: 'Driving Lessons' },
    { id: 'car-hire', label: 'Car Hire' },
    { id: 'test-day', label: 'Test Day Package' },
    { id: 'international', label: 'Overseas Drivers' },
    { id: 'general', label: 'Bookings & Policy' }
  ];

  const filteredFaqs = FAQS.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="faq-page">
      <PageHeader 
        tag="KNOWLEDGE BASE & GUIDELINES"
        title="FREQUENTLY ASKED QUESTIONS."
        subtitle="Everything you need to know about driving lessons, NSW testing requirements, car hire, and overseas licence conversion."
        breadcrumb="FAQ"
      />

      <section className="section-padding">
        <div className="container container-narrow">
          {/* Search & Category Filter */}
          <div className="faq-search-box aura-card">
            <div className="search-input-wrapper">
              <Search size={20} className="search-icon" />
              <input 
                type="text" 
                className="faq-search-input" 
                placeholder="Search question keywords (e.g. 'international', 'warm-up', 'payment')..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="clear-search" onClick={() => setSearchTerm('')}>
                  Clear
                </button>
              )}
            </div>

            <div className="faq-category-pills">
              {categories.map((cat) => (
                <button 
                  key={cat.id} 
                  className={`cat-pill ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Accordion List */}
          <div className="faq-results-area">
            {filteredFaqs.length > 0 ? (
              <Accordion items={filteredFaqs} defaultOpenIndex={0} />
            ) : (
              <div className="no-faq-results aura-card text-center">
                <HelpCircle size={40} className="no-res-icon" />
                <h3>No matching questions found</h3>
                <p>Try searching for a different keyword or contact our instructor directly.</p>
                <Button onClick={() => { setActiveCategory('all'); setSearchTerm(''); }} variant="outline" size="sm">
                  Reset Filters
                </Button>
              </div>
            )}
          </div>

          {/* Need More Help Banner */}
          <div className="faq-support-banner aura-card">
            <div className="support-banner-content">
              <MessageSquare size={32} className="support-icon" />
              <div>
                <h3>Still have an unanswered question?</h3>
                <p>We are always happy to help. Send us an enquiry or call our instructor directly.</p>
              </div>
            </div>
            <Button to="/contact" variant="dark" icon={<ArrowRight size={16} />}>
              CONTACT INSTRUCTOR
            </Button>
          </div>
        </div>
      </section>

      <style>{`
        .faq-search-box {
          background: #FFFFFF;
          padding: 2rem;
          margin-bottom: 2.5rem;
          border-radius: var(--radius-xl);
        }
        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .search-icon {
          position: absolute;
          left: 16px;
          color: var(--text-muted);
        }
        .faq-search-input {
          width: 100%;
          padding: 1rem 1.25rem 1rem 3rem;
          background: var(--bg-surface-alt);
          border: 1.5px solid var(--border-light);
          border-radius: var(--radius-md);
          font-size: 1rem;
          outline: none;
          transition: all 0.2s;
        }
        .faq-search-input:focus {
          border-color: var(--text-primary);
          background: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(17, 24, 32, 0.08);
        }
        .clear-search {
          position: absolute;
          right: 16px;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
        }
        .clear-search:hover {
          color: var(--text-primary);
        }
        .faq-category-pills {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .cat-pill {
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.825rem;
          background: var(--bg-surface-alt);
          color: var(--text-secondary);
          border: 1px solid var(--border-light);
          transition: all 0.2s;
        }
        .cat-pill:hover {
          color: var(--text-primary);
          border-color: var(--border-medium);
        }
        .cat-pill.active {
          background: var(--text-primary);
          color: #FFFFFF;
          border-color: var(--text-primary);
        }
        .no-faq-results {
          padding: 3rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          background: #FFFFFF;
        }
        .no-res-icon {
          color: var(--text-muted);
        }
        .faq-support-banner {
          margin-top: 3.5rem;
          background: var(--accent-subtle);
          border: 1px solid var(--accent-primary);
          padding: 2.25rem;
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .support-banner-content {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .support-icon {
          color: var(--text-primary);
          flex-shrink: 0;
        }
        .support-banner-content h3 {
          font-size: 1.2rem;
          font-weight: 800;
          margin-bottom: 0.2rem;
        }
        .support-banner-content p {
          font-size: 0.875rem;
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
};
