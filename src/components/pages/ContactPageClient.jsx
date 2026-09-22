"use client";
import React from 'react';
import SubPageWrapper from '../SubPageWrapper';
import Contact from '../Contact';

export default function ContactPageClient({ initialData }) {
  return (
    <SubPageWrapper
      initialData={initialData}
      renderContent={({ lang, t, isSectionVisible }) => (
        <>
          {isSectionVisible('contact') && <Contact lang={lang} t={t} />}
        </>
      )}
    />
  );
}
