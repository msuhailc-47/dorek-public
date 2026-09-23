"use client";
import { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { Quote, Star } from 'lucide-react';
import './Testimonials.css';
import useScrollReveal from '../utils/useScrollReveal';

export default function Testimonials({ lang, t }) {
  const { ref: scrollRef, className: scrollClass } = useScrollReveal();
  const tabs = t?.testimonials?.tabs || ['Customers', 'Associates', 'Dealers', 'Investors'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // Synchronize activeTab whenever language or available tabs change
  useEffect(() => {
    if (tabs.length > 0 && !tabs.includes(activeTab)) {
      setActiveTab(tabs[0]);
    }
  }, [lang, tabs, activeTab]);

  const items = t?.testimonials?.items || [];
  const filteredItems = items.filter(item => {
    if (!activeTab || activeTab === 'All' || activeTab === 'എല്ലാം') return true;
    return item.category === activeTab;
  });

  const displayItems = filteredItems.length > 0 ? filteredItems : items;

  if (!t?.testimonials || items.length === 0) return null;

  return (
    <section id="testimonials" className={`section testimonials-sec ${scrollClass}`} ref={scrollRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.testimonials.label || (lang === 'en' ? 'Testimonials' : 'സാക്ഷ്യപത്രങ്ങൾ')}</span>
          <h2 className="section-title">{t.testimonials.title || (lang === 'en' ? 'What People Say' : 'ആളുകൾ എന്ത് പറയുന്നു')}</h2>
          <p className="section-subtitle">{t.testimonials.subtitle}</p>
        </div>
        
        {tabs.length > 1 && (
          <div className="test-tabs">
            {tabs.map((tab, i) => (
              <button 
                key={i} 
                className={`test-tab ${activeTab === tab ? 'test-tab-active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        <div className="test-grid">
          {displayItems.map((item, i) => (
            <div key={i} className="test-card">
              <Quote size={40} className="test-quote" />
              <p className="test-text">{item.text}</p>
              <div className="test-author">
                <div className="test-avatar">{item.name ? item.name.charAt(0) : 'D'}</div>
                <div className="test-author-info">
                  <h3>{item.name}</h3>
                  <span>{item.role}</span>
                </div>
                <div className="test-stars">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="var(--secondary, #D4AF37)" color="var(--secondary, #D4AF37)" />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

