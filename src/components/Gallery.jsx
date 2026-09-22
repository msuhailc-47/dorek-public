"use client";
import { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { getOptimizedUrl } from '../utils/getOptimizedUrl';
import { Image, Play, Trophy, Calendar, X, ExternalLink, Maximize2 } from 'lucide-react';
import './Gallery.css';
import useScrollReveal from '../utils/useScrollReveal';

// Curated high-resolution corporate photography fallbacks (200 OK verified)
const DEFAULT_GALLERY_IMAGES = [
  {
    key: 'office',
    titleEn: 'Corporate Office',
    titleMl: 'കോർപ്പറേറ്റ് ഓഫീസ്',
    category: 'Corporate HQ',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    key: 'team',
    titleEn: 'Team Meeting',
    titleMl: 'ടീം മീറ്റിംഗ്',
    category: 'Leadership & Strategy',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    key: 'product',
    titleEn: 'Product Display',
    titleMl: 'ഉൽപ്പന്ന പ്രദർശനം',
    category: 'Engineering & Technology',
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80'
  },
  {
    key: 'store',
    titleEn: 'Store Opening',
    titleMl: 'സ്റ്റോർ ഓപ്പണിംഗ്',
    category: 'Franchise Network',
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80'
  },
  {
    key: 'training',
    titleEn: 'Training Session',
    titleMl: 'ട്രെയിനിംഗ് സെഷൻ',
    category: 'Skill Development',
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80'
  },
  {
    key: 'summit',
    titleEn: 'Alliance Summit',
    titleMl: 'അലയൻസ് സമ്മിറ്റ്',
    category: 'Annual Convention',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80'
  },
  {
    key: 'award',
    titleEn: 'Award Ceremony',
    titleMl: 'അവാർഡ് ചടങ്ങ്',
    category: 'Excellence & Honors',
    url: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1200&q=80'
  },
  {
    key: 'expo',
    titleEn: 'Exhibition',
    titleMl: 'എക്‌സിബിഷൻ',
    category: 'Trade Expo',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'
  },
  {
    key: 'csr',
    titleEn: 'Community Event',
    titleMl: 'കമ്മ്യൂണിറ്റി ഇവന്റ്',
    category: 'CSR Impact',
    url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80'
  }
];

const DEFAULT_VIDEO_POSTERS = [
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80'
];

export default function Gallery({ lang, t }) {
  const { ref: scrollRef, className: scrollClass } = useScrollReveal();
  const [tab, setTab] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const photos = t.gallery?.photos || [];
  const videos = t.gallery?.videos || [];
  const achievements = t.gallery?.achievements || [];

  // Helper to extract YouTube embed URL
  const getYouTubeEmbed = (url) => {
    if (!url || typeof url !== 'string') return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const tabs = t.gallery?.tabs || [
    lang === 'en' ? 'Photos' : 'ഫോട്ടോകൾ',
    lang === 'en' ? 'Videos' : 'വീഡിയോകൾ',
    lang === 'en' ? 'Achievements' : 'നേട്ടങ്ങൾ'
  ];

  return (
    <section id="gallery" className={`section gallery-sec ${scrollClass}`} ref={scrollRef}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">{t.gallery?.label || (lang === 'en' ? 'Media Hub' : 'മീഡിയ')}</span>
          <h2 className="section-title">{t.gallery?.title || (lang === 'en' ? 'Media Gallery & Milestones' : 'മീഡിയ ഗാലറി & നേട്ടങ്ങൾ')}</h2>
          <p className="section-subtitle">
            {t.gallery?.subtitle || (lang === 'en' ? 'Explore our journey through photos, corporate videos, and industry achievements.' : 'ഞങ്ങളുടെ നാൾവഴികളും പ്രധാന നേട്ടങ്ങളും കാണാം.')}
          </p>
        </div>

        {/* Dedicated Gallery Tabs */}
        <div className="gal-tabs-container">
          {tabs.map((tb, i) => (
            <button
              key={i}
              className={`gal-tab-btn ${tab === i ? 'gal-tab-active' : ''}`}
              onClick={() => setTab(i)}
            >
              <span>{tb}</span>
            </button>
          ))}
        </div>

        {/* Gallery Tab Content */}
        <div className="gal-content">
          {/* Tab 0: Photos */}
          {tab === 0 && (
            <div className="gal-photos-grid animate-fadeIn">
              {photos.map((p, i) => {
                const photoObj = typeof p === 'string' ? { title: p, url: '' } : p;
                const fallback = DEFAULT_GALLERY_IMAGES[i % DEFAULT_GALLERY_IMAGES.length];
                const displayUrl = (photoObj.url && photoObj.url.trim()) ? photoObj.url : fallback.url;
                const displayTitle = photoObj.title || (lang === 'en' ? fallback.titleEn : fallback.titleMl);
                const category = fallback.category;

                return (
                  <div 
                    key={i} 
                    className="gal-photo-card" 
                    onClick={() => setLightbox({ title: displayTitle, url: displayUrl, category })}
                  >
                    <img 
                      src={getOptimizedUrl(displayUrl)} 
                      alt={displayTitle} 
                      className="gal-photo-img" 
                      loading="lazy" 
                      referrerPolicy="no-referrer" 
                    />
                    <div className="gal-photo-overlay">
                      <span className="gal-photo-badge">{category}</span>
                      <h4 className="gal-photo-title">{displayTitle}</h4>
                      <div className="gal-photo-action">
                        <Maximize2 size={16} />
                        <span>{lang === 'en' ? 'Enlarge' : 'കാണുക'}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 1: Videos */}
          {tab === 1 && (
            <div className="gal-videos-grid animate-fadeIn">
              {videos.map((vid, i) => {
                const embedUrl = getYouTubeEmbed(vid.url);
                const posterUrl = DEFAULT_VIDEO_POSTERS[i % DEFAULT_VIDEO_POSTERS.length];
                const introVideoUrl = 'https://youtu.be/HmR_lSJZzps';

                return (
                  <div key={i} className="gal-video-card">
                    {embedUrl ? (
                      <div className="video-iframe-wrapper">
                        <iframe 
                          src={embedUrl} 
                          title={vid.title} 
                          className="gal-video-iframe" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen 
                        />
                      </div>
                    ) : (
                      <div 
                        className="gal-video-preview"
                        style={{
                          backgroundImage: `linear-gradient(180deg, rgba(10, 46, 93, 0.72) 0%, rgba(6, 28, 59, 0.94) 100%), url(${posterUrl})`
                        }}
                        onClick={() => window.open(introVideoUrl, '_blank')}
                      >
                        <div className="video-play-ring">
                          <Play size={24} fill="#D4AF37" color="#D4AF37" style={{ marginLeft: '3px' }} />
                        </div>
                        <span className="video-category-tag">Corporate Video</span>
                        <h4 className="video-preview-title">{vid.title}</h4>
                        <p className="video-preview-sub">Dorek International Media • Watch Video</p>
                      </div>
                    )}
                    <div className="gal-video-title-bar">
                      <span className="gal-video-title">{vid.title}</span>
                      <span className="gal-video-badge">Official Media</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 2: Achievements */}
          {tab === 2 && (
            <div className="gal-ach-grid animate-fadeIn">
              {achievements.map((ach, i) => (
                <div key={i} className="gal-ach-card">
                  <div className="gal-ach-badge">
                    <Trophy size={26} color="#D4AF37" />
                  </div>
                  <div className="gal-ach-content">
                    <div className="gal-ach-header">
                      <h4 className="gal-ach-title">{ach.title}</h4>
                      <span className="gal-ach-year-pill">
                        <Calendar size={13} />
                        <span>{ach.year}</span>
                      </span>
                    </div>
                    <p className="gal-ach-desc">{ach.desc || ach.description || 'Awarded for industry excellence and exemplary service delivery.'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lightbox Modal */}
        {lightbox && (
          <div className="gal-lightbox" onClick={() => setLightbox(null)}>
            <button className="gal-lightbox-close" onClick={() => setLightbox(null)} aria-label="Close Preview">
              <X size={24} />
            </button>
            <div className="gal-lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img 
                src={getOptimizedUrl(lightbox.url)} 
                alt={lightbox.title} 
                className="gal-lightbox-img" 
                referrerPolicy="no-referrer" 
              />
              <div className="gal-lightbox-meta">
                {lightbox.category && <span className="lightbox-category-tag">{lightbox.category}</span>}
                {lightbox.title && <h3 className="gal-lightbox-caption">{lightbox.title}</h3>}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
