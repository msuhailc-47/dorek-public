"use client";
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useCMS, CMSProvider } from '../context/CMSContext';
import Navbar from './Navbar';
import Footer from './Footer';

const WhatsAppButton = dynamic(() => import('./WhatsAppButton'), { ssr: false });
const ChatAssistant = dynamic(() => import('./ChatAssistant'), { ssr: false });

function SubPageContent({ renderContent }) {
  const { lang, setLang, t, isSectionVisible } = useCMS();
  const pathname = usePathname();

  useEffect(() => {
    const scrollToHash = (clearStored = false) => {
      if (typeof window === 'undefined') return;
      const storedHash = sessionStorage.getItem('dorek_scroll_target') || '';
      const urlHash = window.location.hash ? window.location.hash.replace('#', '') : '';
      const hash = urlHash || storedHash;
      if (!hash) return;

      const el = document.getElementById(hash);
      if (el) {
        const headerOffset = 84;
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: Math.max(0, elementPosition - headerOffset),
          behavior: 'smooth'
        });
        if (clearStored) {
          sessionStorage.removeItem('dorek_scroll_target');
        }
      }
    };

    const t1 = setTimeout(() => scrollToHash(false), 80);
    const t2 = setTimeout(() => scrollToHash(false), 350);
    const t3 = setTimeout(() => scrollToHash(true), 650);
    const handleHashChange = () => scrollToHash(true);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [pathname]);

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

      <main style={{ minHeight: '80vh', paddingTop: 'var(--header-height, 76px)' }}>
        {renderContent({
          lang,
          t,
          isSectionVisible
        })}
      </main>

      <Footer lang={lang} t={t} />

      <WhatsAppButton 
        phone={t?.contact?.whatsapp || ''} 
        message="Hi Dorek, I would like to know more about your services.." 
      />

      <ChatAssistant lang={lang} t={t} />
    </div>
  );
}

export default function SubPageWrapper({ initialData, renderContent }) {
  if (!initialData) {
    return <div style={{ padding: '80px', textAlign: 'center' }}>Connecting to Dorek International...</div>;
  }

  return (
    <CMSProvider initialData={initialData}>
      <SubPageContent renderContent={renderContent} />
    </CMSProvider>
  );
}
