"use client";
import React from 'react';
import SubPageWrapper from '../SubPageWrapper';
import Careers from '../Careers';

export default function CareersPageClient({ initialData }) {
  return (
    <SubPageWrapper
      initialData={initialData}
      renderContent={({ lang, t, isSectionVisible }) => (
        <>
          {isSectionVisible('careers') && <Careers lang={lang} t={t} />}
        </>
      )}
    />
  );
}
