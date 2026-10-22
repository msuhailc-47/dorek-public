"use client";
import React from 'react';
import SubPageWrapper from '../SubPageWrapper';
import BoardOfDirectors from '../BoardOfDirectors';

export default function DirectorsPageClient({ initialData }) {
  return (
    <SubPageWrapper
      initialData={initialData}
      renderContent={({ lang, t }) => (
        <BoardOfDirectors lang={lang} t={t} />
      )}
    />
  );
}
