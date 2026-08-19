'use client';
import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import PortalLogin from './PortalLogin';
import { CMSProvider, useCMS } from '../context/CMSContext';

function LegalPageInner({ pageKey, pageTitle }) {
  const { t, lang, setLang } = useCMS();
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  
  const htmlContent = t?.legal?.[pageKey] || <p>Content not available.</p>;

  return (
    <div className='legal-page'>
      <Navbar lang={lang} t={t} onLangChange={() => setLang(lang === 'en' ? 'ml' : 'en')} onPortalOpen={() => setIsPortalOpen(true)} />
      
      <main className='legal-content' style={{ padding: '150px 20px 80px', minHeight: '80vh', maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ color: 'var(--primary)', marginBottom: '30px', fontSize: '2.5rem' }}>{pageTitle}</h1>
        <div 
          className='legal-text' 
          style={{ lineHeight: '1.8', color: 'var(--text-muted)' }}
          dangerouslySetInnerHTML={{ __html: htmlContent }} 
        />
      </main>

      <Footer lang={lang} t={t} />
      <PortalLogin lang={lang} t={t} isOpen={isPortalOpen} onClose={() => setIsPortalOpen(false)} />
    </div>
  );
}

export default function LegalPageClient({ initialData, pageKey, pageTitle }) {
  if (!initialData) return <div>Loading...</div>;
  return (
    <CMSProvider initialData={initialData}>
      <LegalPageInner pageKey={pageKey} pageTitle={pageTitle} />
    </CMSProvider>
  );
}
