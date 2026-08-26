import React, { useState } from 'react';
import { Search, BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { BLOG_ARTICLES } from '../data/content';
import { PageHeader } from '../components/layout/PageHeader';
import { BlogCard } from '../components/ui/BlogCard';
import { BlogArticle } from '../types';
import { Button } from '../components/ui/Button';

interface BlogProps {
  onSelectArticle: (article: BlogArticle) => void;
}

export const Blog: React.FC<BlogProps> = ({ onSelectArticle }) => {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = ['All', 'Driving Test', 'NSW Licence', 'International Drivers', 'Driving Tips', 'Test Preparation'];

  const filteredArticles = BLOG_ARTICLES.filter(a => {
    const matchesCat = selectedCat === 'All' || a.category === selectedCat;
    const matchesSearch = searchTerm === '' || 
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      a.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featured = BLOG_ARTICLES[0];

  return (
    <div className="blog-page">
      <PageHeader 
        tag="NSW DRIVING INSIGHTS & GUIDES"
        title="ROAD SAFETY & TEST PREPARATION ARTICLES."
        subtitle="Practical driving strategies, overseas licence rules, and insider tips to pass your Service NSW driving test on the first try."
        breadcrumb="Blog & Guides"
      />

      <section className="section-padding">
        <div className="container">
          {/* Featured Article Hero Banner */}
          {selectedCat === 'All' && !searchTerm && (
            <div className="featured-hero-article aura-card">
              <div className="featured-grid">
                <div className="featured-img-wrap">
                  <img 
                    src={featured.image} 
                    alt={featured.title} 
                    className="featured-img" 
                    style={{
                      objectPosition: featured.imagePosition || 'center 62%'
                    }}
                  />
                  <span className="pill-badge accent feat-badge">FEATURED GUIDE</span>
                </div>
                <div className="featured-content">
                  <span className="pill-badge">{featured.category}</span>
                  <h2 className="featured-title">{featured.title}</h2>
                  <p className="featured-excerpt">{featured.excerpt}</p>
                  <div className="featured-meta">
                    <span>{featured.date}</span> • <span>{featured.readTime}</span>
                  </div>
                  <div className="featured-cta">
                    <Button onClick={() => onSelectArticle(featured)} variant="primary" icon={<ArrowRight size={16} />}>
                      READ FULL GUIDE
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search & Category Filter */}
          <div className="blog-filter-bar aura-card">
            <div className="blog-search-wrap">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                className="blog-search-input" 
                placeholder="Search articles by topic (e.g., parking, roundabouts, overseas)..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="blog-cat-list">
              {categories.map((c) => (
                <button 
                  key={c} 
                  className={`blog-cat-btn ${selectedCat === c ? 'active' : ''}`}
                  onClick={() => setSelectedCat(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid-3">
            {filteredArticles.map((article) => (
              <BlogCard key={article.id} article={article} onSelect={onSelectArticle} />
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="no-articles-card aura-card text-center">
              <h3>No articles found</h3>
              <p>Try searching for a different keyword or select another category.</p>
              <Button onClick={() => { setSelectedCat('All'); setSearchTerm(''); }} variant="outline" size="sm">
                View All Articles
              </Button>
            </div>
          )}

          {/* Newsletter Subscribe */}
          <div className="newsletter-card aura-card text-center">
            <span className="pill-badge accent">NSW ROAD SAFETY UPDATES</span>
            <h3 className="newsletter-title">Subscribe to Driving Tips & Test Route Updates</h3>
            <p className="newsletter-desc">
              Receive new guides on Sydney test center route changes, road rule revisions, and parking tutorials directly in your inbox.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to NSW driving updates placeholder!'); }} className="newsletter-form">
              <input type="email" placeholder="Enter your email address" className="form-input" required />
              <Button type="submit" variant="dark" icon={<ArrowRight size={16} />}>
                SUBSCRIBE
              </Button>
            </form>
          </div>
        </div>
      </section>

      <style>{`
        .featured-hero-article {
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          padding: 0;
          overflow: hidden;
          margin-bottom: 3rem;
        }
        .featured-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          align-items: center;
        }
        @media (max-width: 900px) {
          .featured-grid {
            grid-template-columns: 1fr;
          }
        }
        .featured-img-wrap {
          height: 380px;
          position: relative;
          background: #EAE8DE;
        }
        .featured-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .feat-badge {
          position: absolute;
          top: 20px;
          left: 20px;
        }
        .featured-content {
          padding: 3rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        @media (max-width: 600px) {
          .featured-content {
            padding: 2rem 1.5rem;
          }
        }
        .featured-title {
          font-size: 1.85rem;
          font-weight: 900;
          margin-top: 0.75rem;
          margin-bottom: 0.75rem;
          line-height: 1.2;
        }
        .featured-excerpt {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin-bottom: 1.5rem;
        }
        .featured-meta {
          font-size: 0.825rem;
          color: var(--text-muted);
          margin-bottom: 1.75rem;
        }

        /* Filter */
        .blog-filter-bar {
          background: #FFFFFF;
          padding: 1.5rem 2rem;
          border-radius: var(--radius-xl);
          margin-bottom: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .blog-search-wrap {
          position: relative;
        }
        .blog-search-wrap .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        .blog-search-input {
          width: 100%;
          padding: 0.8rem 1rem 0.8rem 2.75rem;
          background: var(--bg-surface-alt);
          border: 1.5px solid var(--border-light);
          border-radius: var(--radius-md);
          outline: none;
          font-size: 0.95rem;
        }
        .blog-search-input:focus {
          border-color: var(--text-primary);
          background: #FFFFFF;
        }
        .blog-cat-list {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .blog-cat-btn {
          padding: 0.4rem 0.9rem;
          border-radius: var(--radius-full);
          font-size: 0.825rem;
          font-weight: 700;
          background: var(--bg-surface-alt);
          color: var(--text-secondary);
          border: 1px solid var(--border-light);
          transition: all 0.2s;
        }
        .blog-cat-btn:hover {
          color: var(--text-primary);
        }
        .blog-cat-btn.active {
          background: var(--text-primary);
          color: #FFFFFF;
          border-color: var(--text-primary);
        }
        .no-articles-card {
          background: #FFFFFF;
          padding: 3rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        /* Newsletter */
        .newsletter-card {
          margin-top: 4.5rem;
          background: var(--bg-surface-alt);
          border: 1px solid var(--border-light);
          padding: 3.5rem 2rem;
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .newsletter-title {
          font-size: 1.75rem;
          font-weight: 900;
          margin-top: 0.75rem;
          margin-bottom: 0.5rem;
        }
        .newsletter-desc {
          max-width: 580px;
          margin-bottom: 1.75rem;
        }
        .newsletter-form {
          display: flex;
          gap: 0.75rem;
          width: 100%;
          max-width: 480px;
          flex-wrap: wrap;
        }
        .newsletter-form .form-input {
          flex: 1;
          min-width: 240px;
        }
      `}</style>
    </div>
  );
};
