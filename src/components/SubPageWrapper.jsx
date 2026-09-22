"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useCMS, CMSProvider } from '../context/CMSContext';
import Navbar from './Navbar';
import Footer from './Footer';

const WhatsAppButton = dynamic(() => import('./WhatsAppButton'), { ssr: false });
const ChatAssistant = dynamic(() => import('./ChatAssistant'), { ssr: false });

function SubPageContent({ renderContent }) {
  const { lang, setLang, t, isSectionVisible } = useCMS();

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
