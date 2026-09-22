"use client";
import React from 'react';
import SubPageWrapper from '../SubPageWrapper';
import Gallery from '../Gallery';
import News from '../News';
import Investors from '../Investors';
import Downloads from '../Downloads';

export default function MediaPageClient({ initialData }) {
  return (
    <SubPageWrapper
      initialData={initialData}
      renderContent={({ lang, t, isSectionVisible }) => (
        <>
          {isSectionVisible('gallery') && <Gallery lang={lang} t={t} />}
          {isSectionVisible('news') && <News lang={lang} t={t} />}
          {isSectionVisible('investors') && <Investors lang={lang} t={t} />}
          {isSectionVisible('downloads') && <Downloads lang={lang} t={t} />}
        </>
      )}
    />
  );
}
