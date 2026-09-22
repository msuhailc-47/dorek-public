'use client';
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { CMSProvider, useCMS } from '../context/CMSContext';
import translations from '../i18n/translations';

function LegalPageInner({ pageKey, pageTitle }) {
  const { t, lang, setLang } = useCMS();
  
  // Use Firestore data, fallback to local dummy data, then error message
  const localDummyData = translations?.[lang]?.legal?.[pageKey];
  const htmlContent = t?.legal?.[pageKey] || localDummyData || '<p>Content not available. Please add it from the Admin Panel.</p>';

  return (
    <div className='legal-page'>
      <Navbar minimal={true} lang={lang} t={t} onLangChange={() => setLang(lang === 'en' ? 'ml' : 'en')} />
      
      <main className='legal-content container' style={{ paddingTop: '110px', paddingBottom: '80px', minHeight: '80vh' }}>
        <div style={{ maxWidth: '900px' }}>
          <h1 style={{ color: 'var(--primary)', marginBottom: '30px', fontSize: '2.5rem' }}>{pageTitle}</h1>
          <div 
            className='legal-text' 
            style={{ lineHeight: '1.8', color: 'var(--text-muted)' }}
            dangerouslySetInnerHTML={{ __html: htmlContent }} 
          />
        </div>
      </main>

      <Footer lang={lang} t={t} />
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
