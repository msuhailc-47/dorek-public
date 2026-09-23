"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Businesses from './Businesses';
import WhyChoose from './WhyChoose';
import Testimonials from './Testimonials';
import CustomSections from './CustomSections';
import Footer from './Footer';

// Defer non-critical floating / modal components for rapid FCP / LCP
const ChatAssistant = dynamic(() => import('./ChatAssistant'), { ssr: false });
const WhatsAppButton = dynamic(() => import('./WhatsAppButton'), { ssr: false });

export default function MainSite() {
  const [loadFloatingWidgets, setLoadFloatingWidgets] = useState(false);
  const { lang, setLang, t, sectionVisibility } = useCMS();
  
  // Convert boolean-based section visibility mapping
  const isSectionVisible = (id) => sectionVisibility[id] !== false;

  useEffect(() => {
    const triggerFloating = () => {
      setLoadFloatingWidgets(true);
      window.removeEventListener('scroll', triggerFloating);
      window.removeEventListener('mousemove', triggerFloating);
      window.removeEventListener('touchstart', triggerFloating);
      window.removeEventListener('pointerdown', triggerFloating);
    };

    window.addEventListener('scroll', triggerFloating, { passive: true, once: true });
    window.addEventListener('mousemove', triggerFloating, { passive: true, once: true });
    window.addEventListener('touchstart', triggerFloating, { passive: true, once: true });
    window.addEventListener('pointerdown', triggerFloating, { passive: true, once: true });

    const timer = setTimeout(() => setLoadFloatingWidgets(true), 8000);

    // Log unique visitor session safely on idle via server API route
    const logVisit = async () => {
      if (typeof window === 'undefined') return;
      if (!sessionStorage.getItem('dorek_visit_logged')) {
        try {
          await fetch('/api/analytics', { method: 'POST', keepalive: true });
          sessionStorage.setItem('dorek_visit_logged', 'true');
        } catch {
          // Graceful fallback
        }
      }
    };

    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(logVisit, { timeout: 8000 });
      } else {
        setTimeout(logVisit, 8000);
      }
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', triggerFloating);
      window.removeEventListener('mousemove', triggerFloating);
      window.removeEventListener('touchstart', triggerFloating);
    };
  }, []);

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ml' : 'en');
  };

  return (
    <div className="app-container">
      <Navbar 
        lang={lang} 
        t={t} 
        onLangChange={toggleLang} 
      />
      
      <main>
        {/* 1. Hero Section (Above the Fold) */}
        {isSectionVisible('hero') && <Hero lang={lang} t={t} />}

        {/* 2. Executive About Section */}
        {isSectionVisible('about') && <About lang={lang} t={t} />}

        {/* 3. Core Business Verticals Bento Grid */}
        {isSectionVisible('businesses') && (
          <div className="home-section-wrapper">
            <Businesses lang={lang} t={t} />
            <div className="section-cta-banner">
              <Link href="/businesses" className="section-cta-btn">
                <span>{lang === 'en' ? 'Explore All Products, Software & Franchise Models' : 'എല്ലാ ഉൽപ്പന്നങ്ങളും ബിസിനസ് അവസരങ്ങളും കാണുക'}</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}

        {/* 4. Why Dorek Group */}
        {isSectionVisible('whyChoose') && <WhyChoose lang={lang} t={t} />}

        {/* 5. Testimonials & Social Proof */}
        {isSectionVisible('testimonials') && <Testimonials lang={lang} t={t} />}

        {/* Dynamic CMS Sections */}
        <CustomSections lang={lang} t={t} />
      </main>
      
      <Footer lang={lang} t={t} />
      
      {loadFloatingWidgets && (
        <>
          <WhatsAppButton 
            phone={t.contact?.whatsapp || ''} 
            message="Hi Dorek, I would like to know more about your services.." 
          />
          <ChatAssistant lang={lang} t={t} />
        </>
      )}
    </div>
  );
}
