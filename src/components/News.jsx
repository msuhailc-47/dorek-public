"use client";
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { Calendar, ArrowRight, Newspaper, X } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import './News.css';
import useScrollReveal from '../utils/useScrollReveal';

export default function News({ lang, t }) {
  const { ref: scrollRef, className: scrollClass } = useScrollReveal();
  const [activeArticle, setActiveArticle] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeArticle !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeArticle]);

  const newsItems = t.news.items || [];
  if (newsItems.length === 0) return null;

  const featured = newsItems[0];
  const rest = newsItems.slice(1);

  return (
    <section id="news" className={`section news-sec ${scrollClass}`} ref={scrollRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.news.label}</span>
          <h2 className="section-title">{t.news.title}</h2>
          <p className="section-subtitle">{t.news.subtitle}</p>
        </div>
        {featured && (
          <div className="news-featured">
            <div className="news-featured-img"><Newspaper size={48} /></div>
            <div className="news-featured-content">
              <span className="badge">{featured.cat}</span>
              <h3>{featured.title}</h3>
              <p>{featured.excerpt}</p>
              <div className="news-date"><Calendar size={14} /> {featured.date}</div>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => setActiveArticle(featured)}
              >
                {t.news.readMore} <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
        <div className="news-grid">
          {rest.map((item, i) => (
            <div key={i} className="news-card">
              <div className="news-card-img"><Newspaper size={32} /></div>
              <div className="news-card-body">
                <div className="news-card-top">
                  <span className="badge badge-emerald">{item.cat}</span>
                  <span className="news-date-sm"><Calendar size={12} /> {item.date}</span>
                </div>
                <h4>{item.title}</h4>
                <p>{item.excerpt}</p>
                <button
                  type="button"
                  className="news-read-more"
                  style={{ background: 'none', border: 'none', padding: 0, font: 'inherit' }}
                  onClick={() => setActiveArticle(item)}
                >
                  {t.news.readMore} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {mounted && activeArticle && typeof document !== 'undefined' && (
        createPortal(
          <div className="biz-popup-overlay" onClick={() => setActiveArticle(null)}>
            <div className="biz-popup-modal" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="biz-popup-close"
                onClick={() => setActiveArticle(null)}
                aria-label="Close Article"
              >
                <X size={22} />
              </button>
              <div className="biz-popup-header">
                <div className="biz-popup-icon" style={{ background: 'linear-gradient(135deg, #0A2E5D, #1E40AF)' }}>
                  <Newspaper size={28} color="#D4AF37" />
                </div>
                <div>
                  <span className="badge">{activeArticle.cat}</span>
                  <div className="news-date" style={{ marginTop: '6px', marginBottom: 0 }}>
                    <Calendar size={13} /> {activeArticle.date}
                  </div>
                </div>
              </div>
              <div className="biz-popup-body">
                <h3 className="biz-popup-title" style={{ marginBottom: '14px' }}>{activeArticle.title}</h3>
                <p className="biz-popup-desc">{activeArticle.excerpt}</p>
                {activeArticle.details && (
                  <div className="biz-popup-details" style={{ marginBottom: '20px' }}>
                    {activeArticle.details}
                  </div>
                )}
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                  <Link
                    href="/contact"
                    className="btn btn-primary btn-sm"
                    style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    onClick={() => setActiveArticle(null)}
                  >
                    <span>{lang === 'en' ? 'Connect With Media Desk' : 'മീഡിയ വിഭാഗവുമായി ബന്ധപ്പെടുക'}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      )}
    </section>
  );
}

