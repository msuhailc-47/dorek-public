"use client";
import React, { createContext, useContext } from 'react';

const CMSContext = createContext(null);

export function CMSProvider({ children, initialData }) {
  if (!initialData) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Loading Enterprise CMS Data...</div>;
  }

  const { translationsData, themeSettings, sectionVisibility, codeSettings, customSections, navigation } = initialData;
  const lang = 'en';
  const t = translationsData && translationsData[lang] ? translationsData[lang] : null;

  // Simple animation class generator, could be upgraded to IntersectionObserver
  const getAnimationClass = (sectionId) => {
    return 'animate-fadeIn'; 
  };
  
  const isSectionVisible = (id) => sectionVisibility ? sectionVisibility[id] !== false : true;

  if (!t) return null;

  return (
    <CMSContext.Provider value={{
      lang,
      t,
      themeSettings: themeSettings || {},
      sectionVisibility: sectionVisibility || {},
      isSectionVisible,
      codeSettings: codeSettings || {},
      customSections: customSections || [],
      navigation: navigation || [],
      getAnimationClass
    }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within CMSProvider');
  }
  return context;
}
