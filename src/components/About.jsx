"use client";
import { useState } from 'react';
import { Eye, Target, Heart, Users, Award, Leaf, Quote, ChevronDown, Calendar } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { getOptimizedUrl, convertDriveUrl } from '../utils/getOptimizedUrl';
import './About.css';
import useScrollReveal from '../utils/useScrollReveal';
import translations from '../i18n/translations';

export default function About({ lang, t }) {
  const { ref: scrollRef, className: scrollClass } = useScrollReveal();
  const [showAllTimeline, setShowAllTimeline] = useState(false);
  const timelineItems = t.about?.timelineItems || [];
  const visibleTimelineItems = showAllTimeline ? timelineItems : timelineItems.slice(0, 3);
  const foundersList = (t.about?.founders && t.about.founders.length > 0)
    ? t.about.founders
    : (translations[lang]?.about?.founders || translations.en?.about?.founders || []);

  return (
    <section id="about" className={`section about ${scrollClass}`} ref={scrollRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.about?.label || (lang === 'en' ? 'About Us' : 'ഞങ്ങളെക്കുറിച്ച്')}</span>
          <h2 className="section-title">{t.about?.title || (lang === 'en' ? 'About Dorek International' : 'ഡോറക് ഇന്റർനാഷണൽ')}</h2>
          <p className="section-subtitle">{t.about?.subtitle}</p>
        </div>

        <div className="about-grid">
          <div className="about-history">
            {t.about?.image ? (
              <div className="about-image-container">
                <img 
                  src={getOptimizedUrl(t.about.image)} 
                  alt="Dorek International Headquarters" 
                  width="600" 
                  height="400" 
                  loading="lazy" 
                  decoding="async" 
                  className="about-real-image" 
                />
              </div>
            ) : (
              <div className="about-image-placeholder">
                <div className="about-img-icon">🏢</div>
                <span>Corporate Headquarters</span>
              </div>
            )}
            <h3 className="about-h3">{t.about?.history}</h3>
            <p className="about-text">{t.about?.historyText}</p>
          </div>
          <div className="about-vm">
            <div className="about-card about-card-vision">
              <div className="about-card-icon"><Eye size={28} /></div>
              <h4>{t.about?.vision}</h4>
              <p>{t.about?.visionText}</p>
            </div>
            <div className="about-card about-card-mission">
              <div className="about-card-icon about-card-icon-gold"><Target size={28} /></div>
              <h4>{t.about?.mission}</h4>
              <p>{t.about?.missionText}</p>
            </div>
          </div>
        </div>

        <div className="about-values-section">
          <h3 className="about-h3 about-h3-center">{t.about?.coreValues}</h3>
          <div className="about-values-grid">
            {(t.about?.values || []).map((val, i) => {
              return (
                <div key={i} className="about-value-item">
                  <div className="about-value-icon"></div>
                  <span>{val}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="about-founder">
          <div className="about-founder-card">
            <Quote size={40} className="about-quote-icon" />
            <p className="about-founder-msg">{t.about?.founderMsg}</p>
            <div className="about-founder-info">
              <div className="about-founder-avatar">
                {t.about?.founderName ? t.about.founderName.charAt(0) : 'A'}
              </div>
              <div>
                <div className="about-founder-name">{t.about?.founderName || 'Abdulla Ullattil'}</div>
                <div className="about-founder-role" style={{ fontSize: '0.85rem', color: 'rgba(10, 46, 93, 0.7)', fontWeight: 600, marginBottom: '2px' }}>{t.about?.founderRole || 'Founder & Managing Partner'}</div>
                <div className="about-founder-company">{t.about?.founderCompany || 'Dorek International Enterprises LLP'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Founders & Board of Leadership Grid */}
        {foundersList.length > 0 && (
          <div className="about-founders-section">
            <div className="section-header" style={{ marginBottom: '36px' }}>
              <span className="section-label">{lang === 'en' ? 'Leadership' : 'നേതൃത്വം'}</span>
              <h3 className="about-h3 about-h3-center">{t.about?.foundersTitle || (lang === 'en' ? 'Founders & Board of Leadership' : 'സ്ഥാപകരും നേതൃത്വവും')}</h3>
              <p className="about-tl-subtitle">
                {t.about?.foundersSubtitle || (lang === 'en' 
                  ? 'Meet the visionary founding leadership driving innovation, sustainable operations, and business excellence at Dorek International Enterprises LLP.'
                  : 'ഡോറക് ഇന്റർനാഷണൽ എന്റർപ്രൈസസ് എൽഎൽപിയുടെ വിജയത്തിന് പിന്നിലെ സ്ഥാപക നേതൃത്വം.')}
              </p>
            </div>

            <div className="about-founders-grid">
              {foundersList.map((founder, idx) => (
                <div key={idx} className="about-founder-profile-card">
                  <div className="about-founder-photo-wrapper">
                    {founder.photo ? (
                      <img 
                        src={getOptimizedUrl(founder.photo)} 
                        alt={founder.name} 
                        className="about-founder-photo" 
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const direct = convertDriveUrl(founder.photo);
                          if (direct && e.target.src !== direct) {
                            e.target.src = direct;
                          }
                        }}
                      />
                    ) : (
                      <div className="about-founder-photo-placeholder">
                        <span>{founder.name ? founder.name.charAt(0) : 'D'}</span>
                      </div>
                    )}
                  </div>
                  <div className="about-founder-details">
                    <h4 className="about-founder-card-name">{founder.name}</h4>
                    <span className="about-founder-card-role">{founder.role}</span>
                    <p className="about-founder-card-bio">{founder.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Horizontal Timeline Section: Max 3 items visible by default + View More Toggle */}
        <div id="timeline" className="about-timeline-section">
          <div className="section-header" style={{ marginBottom: '36px' }}>
            <span className="section-label">{lang === 'en' ? 'Our Milestones' : 'നാൾവഴികൾ'}</span>
            <h3 className="about-h3 about-h3-center">{t.about?.timeline || (lang === 'en' ? 'Company Journey & Milestones' : 'കമ്പനി നാൾവഴികൾ')}</h3>
            <p className="about-tl-subtitle">
              {lang === 'en' 
                ? 'Key milestones that shaped our journey from foundation to a multi-divisional corporate enterprise.'
                : 'ഞങ്ങളുടെ തുടക്കം മുതൽ ഇന്നുവരെയുള്ള പ്രധാന നാഴികക്കല്ലുകൾ.'}
            </p>
          </div>

          <div className="about-tl-horizontal">
            <div className="about-tl-track">
              {visibleTimelineItems.map((item, i) => {
                const stepNum = String(i + 1).padStart(2, '0');
                const hasNextInRow = (i % 3 !== 2) && (i !== visibleTimelineItems.length - 1);

                return (
                  <div key={i} className="about-tl-card animate-fadeIn">
                    <div className="about-tl-node-wrapper">
                      <div className="about-tl-node">
                        <span className="about-tl-node-num">{stepNum}</span>
                      </div>
                      {hasNextInRow && <div className="about-tl-node-line" />}
                    </div>

                    <div className="about-tl-card-inner">
                      <div className="about-tl-year-badge">
                        <Calendar size={13} />
                        <span>{item.year}</span>
                      </div>
                      <h4 className="about-tl-card-title">{item.title}</h4>
                      <p className="about-tl-card-desc">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View More / Show Less Toggle Button */}
            {timelineItems.length > 3 && (
              <div className="about-tl-action">
                <button
                  type="button"
                  className="about-tl-more-btn"
                  onClick={() => setShowAllTimeline(!showAllTimeline)}
                  aria-expanded={showAllTimeline}
                >
                  <span>
                    {showAllTimeline
                      ? (lang === 'en' ? 'Show Less' : 'ചുരുക്കുക')
                      : (lang === 'en' 
                          ? `View More Milestones (+${timelineItems.length - 3})` 
                          : `കൂടുതൽ നാഴികക്കല്ലുകൾ (+${timelineItems.length - 3})`
                        )
                    }
                  </span>
                  <ChevronDown size={17} className={`tl-chevron ${showAllTimeline ? 'rotate-180' : ''}`} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
