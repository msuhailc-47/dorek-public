"use client";
import React from 'react';
import SubPageWrapper from '../SubPageWrapper';
import About from '../About';

export default function AboutPageClient({ initialData }) {
  return (
    <SubPageWrapper
      initialData={initialData}
      renderContent={({ lang, t, isSectionVisible }) => (
        <>
          {isSectionVisible('about') && <About lang={lang} t={t} />}
        </>
      )}
    />
  );
}

