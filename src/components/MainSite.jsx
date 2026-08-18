"use client";
import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Businesses from './Businesses';
import WhyChoose from './WhyChoose';
import Products from './Products';
import Opportunities from './Opportunities';
import Software from './Software';
import Network from './Network';
import Investors from './Investors';
import Careers from './Careers';
import News from './News';
import Gallery from './Gallery';
import Downloads from './Downloads';
import Testimonials from './Testimonials';
import CSR from './CSR';
import Contact from './Contact';
import CustomSections from './CustomSections';
import Footer from './Footer';
import PortalLogin from './PortalLogin';
import ChatAssistant from './ChatAssistant';
import WelcomeScreen from './WelcomeScreen';

export default function MainSite() {
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  
  const { lang, t, sectionVisibility } = useCMS();
  
  // Convert boolean-based section visibility mapping
  const isSectionVisible = (id) => sectionVisibility[id] !== false;

  const toggleLang = () => {
    // Basic stub, real app might change context state, but context is read-only right now
    alert("Language switching requires SSR locale changes in Next.js setup");
  };

  return (
    <div className={`app-container ${showWelcome ? 'welcome-active' : ''}`}>
      {showWelcome && <WelcomeScreen onComplete={() => setShowWelcome(false)} />}
      <Navbar lang={lang} t={t} onLangChange={toggleLang} onPortalOpen={() => setIsPortalOpen(true)} />
      
      <main>
        {isSectionVisible('hero') && <Hero lang={lang} t={t} />}
        {isSectionVisible('about') && <About lang={lang} t={t} />}
        {isSectionVisible('businesses') && <Businesses lang={lang} t={t} />}
        {isSectionVisible('whyChoose') && <WhyChoose lang={lang} t={t} />}
        {isSectionVisible('products') && <Products lang={lang} t={t} />}
        {isSectionVisible('opportunities') && <Opportunities lang={lang} t={t} onApplyOpen={() => setIsPortalOpen(true)} />}
        {isSectionVisible('software') && <Software lang={lang} t={t} />}
        {isSectionVisible('network') && <Network lang={lang} t={t} />}
        {isSectionVisible('investors') && <Investors lang={lang} t={t} />}
        {isSectionVisible('careers') && <Careers lang={lang} t={t} />}
        {isSectionVisible('news') && <News lang={lang} t={t} />}
        {isSectionVisible('gallery') && <Gallery lang={lang} t={t} />}
        {isSectionVisible('downloads') && <Downloads lang={lang} t={t} />}
        {isSectionVisible('testimonials') && <Testimonials lang={lang} t={t} />}
        {isSectionVisible('csr') && <CSR lang={lang} t={t} />}
        {isSectionVisible('contact') && <Contact lang={lang} t={t} />}
        <CustomSections lang={lang} t={t} />
      </main>
      
      <Footer lang={lang} t={t} />
      
      <PortalLogin lang={lang} t={t} isOpen={isPortalOpen} onClose={() => setIsPortalOpen(false)} />
      <ChatAssistant lang={lang} t={t} />
    </div>
  );
}
