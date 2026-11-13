"use client";
import React from 'react';
import SubPageWrapper from '../SubPageWrapper';
import Catalog from '../Catalog';

export default function CatalogPageClient({ initialData }) {
  return (
    <SubPageWrapper
      initialData={initialData}
      renderContent={({ lang, t }) => (
        <Catalog lang={lang} t={t} />
      )}
    />
  );
}
