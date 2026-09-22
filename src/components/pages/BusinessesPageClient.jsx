"use client";
import React from 'react';
import SubPageWrapper from '../SubPageWrapper';
import Businesses from '../Businesses';
import Products from '../Products';
import Software from '../Software';
import Network from '../Network';
import Opportunities from '../Opportunities';

export default function BusinessesPageClient({ initialData }) {
  return (
    <SubPageWrapper
      initialData={initialData}
      renderContent={({ lang, t, isSectionVisible }) => (
        <>
          {isSectionVisible('businesses') && <Businesses lang={lang} t={t} />}
          {isSectionVisible('products') && <Products lang={lang} t={t} />}
          {isSectionVisible('software') && <Software lang={lang} t={t} />}
          {isSectionVisible('network') && <Network lang={lang} t={t} />}
          {isSectionVisible('opportunities') && <Opportunities lang={lang} t={t} />}
        </>
      )}
    />
  );
}
