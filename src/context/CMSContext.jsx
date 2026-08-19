"use client";
import React, { createContext, useContext } from 'react';
import { doc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const CMSContext = createContext(null);

export function CMSProvider({ children, initialData }) {
  if (!initialData) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Loading Enterprise CMS Data...</div>;
  }

  const { translationsData, themeSettings, sectionVisibility, codeSettings, customSections, navigation } = initialData;
  const [lang, setLang] = React.useState('en');
  const t = translationsData && translationsData[lang] ? translationsData[lang] : null;

  // Fallback custom sections to English if Malayalam doesn't have them
  const fallbackCustomSections = (t && t.customSections && t.customSections.length > 0)
    ? t.customSections
    : (translationsData?.en?.customSections || []);

  // Simple animation class generator, could be upgraded to IntersectionObserver
  const getAnimationClass = (sectionId) => {
    return 'animate-fadeIn'; 
  };
  
  const isSectionVisible = (id) => sectionVisibility ? sectionVisibility[id] !== false : true;

  const addSubmission = async (formData) => {
    try {
      const submission = { id: Date.now(), date: new Date().toLocaleString(), ...formData };
      const docRef = doc(db, 'dorek_cms', 'submissions');
      await updateDoc(docRef, {
        submissions: arrayUnion(submission)
      });
    } catch (error) {
      // If the document doesn't exist yet, create it
      if (error.code === 'not-found') {
        const submission = { id: Date.now(), date: new Date().toLocaleString(), ...formData };
        await setDoc(doc(db, 'dorek_cms', 'submissions'), { submissions: [submission] });
      } else {
        console.error("Error adding submission: ", error);
      }
    }
  };

  if (!t) return null;

  return (
    <CMSContext.Provider value={{
      lang,
      setLang,
      t,
      themeSettings: themeSettings || {},
      sectionVisibility: sectionVisibility || {},
      isSectionVisible,
      codeSettings: codeSettings || {},
      customSections: fallbackCustomSections,
      navigation: navigation || [],
      getAnimationClass,
      addSubmission
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
