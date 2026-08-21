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
import LeadPopup from './LeadPopup';
import WhatsAppButton from './WhatsAppButton';

export default function MainSite() {
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  
  const { lang, setLang, t, sectionVisibility } = useCMS();
  
  // Convert boolean-based section visibility mapping
  const isSectionVisible = (id) => sectionVisibility[id] !== false;

  React.useEffect(() => {
    // Log unique visitor session
    const logVisit = async () => {
      if (!sessionStorage.getItem('dorek_visit_logged')) {
        try {
          const { doc, setDoc, increment } = await import('firebase/firestore');
          const { db } = await import('../firebase');
          const analyticsRef = doc(db, 'dorek_cms', 'analytics');
          // increment(1) safely adds 1 to the counter in Firestore
          await setDoc(analyticsRef, { totalVisitors: increment(1) }, { merge: true });
          sessionStorage.setItem('dorek_visit_logged', 'true');
        } catch (e) {
          console.error("Failed to log visit", e);
        }
      }
    };
    logVisit();
  }, []);

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ml' : 'en');
  };

  return (
    <div className={`app-container ${showWelcome ? 'welcome-active' : ''}`}>
      {showWelcome && <WelcomeScreen t={t} onComplete={() => setShowWelcome(false)} />}
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
      <WhatsAppButton 
        phone={t.contact?.whatsapp || ''} 
        message="Hi Dorek, I would like to know more about your services.." 
      />
      <ChatAssistant lang={lang} t={t} />
      <LeadPopup />
    </div>
  );
}
