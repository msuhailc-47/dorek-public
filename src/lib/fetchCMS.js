// Helper to parse Firestore REST API response
const parseFirestoreValue = (value) => {
  if (!value) return null;
  if ('stringValue' in value) return value.stringValue;
  if ('integerValue' in value) return parseInt(value.integerValue, 10);
  if ('doubleValue' in value) return parseFloat(value.doubleValue);
  if ('booleanValue' in value) return value.booleanValue;
  if ('arrayValue' in value) {
    return (value.arrayValue.values || []).map(parseFirestoreValue);
  }
  if ('mapValue' in value) {
    const obj = {};
    for (const [k, v] of Object.entries(value.mapValue.fields || {})) {
      obj[k] = parseFirestoreValue(v);
    }
    return obj;
  }
  if ('nullValue' in value) return null;
  return value;
};

import translations from '../i18n/translations';

const defaultFallbackData = {
  translationsData: translations,
  themeSettings: {
    colors: { primary: '#0A2E5D', secondary: '#D4AF37', bgMain: '#FFFFFF', bgSection: '#F5F7FA' },
    animations: {},
    sectionBackgrounds: {}
  },
  sectionVisibility: {
    hero: true, about: true, businesses: true, whyChoose: true, products: true,
    opportunities: true, software: true, network: true, investors: true,
    careers: true, news: true, gallery: true, downloads: true, testimonials: true,
    csr: true, contact: true
  },
  navigation: [],
  codeSettings: {}
};

export async function fetchCMSData() {
  const projectId = 'dorek-international-3ef93';
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/dorek_cms`;
  
  try {
    // Next.js ISR: Revalidate every 10 seconds for fast admin updates
    const res = await fetch(url, { next: { revalidate: 10 } });
    
    if (!res.ok) {
      console.warn('Could not fetch remote CMS data from Firestore, using local fallback.');
      return defaultFallbackData;
    }

    const json = await res.json();
    if (!json || !json.documents) {
      return defaultFallbackData;
    }

    const data = { ...defaultFallbackData };

    (json.documents || []).forEach((doc) => {
      const id = doc.name.split('/').pop();
      const parsedFields = {};
      for (const [k, v] of Object.entries(doc.fields || {})) {
        parsedFields[k] = parseFirestoreValue(v);
      }
      // Unwrap the top level key since our migration script wrapped them like { themeSettings: { ... } }
      data[id] = parsedFields[id] !== undefined ? parsedFields[id] : parsedFields;
    });

    if (!data.translationsData) {
      data.translationsData = translations;
    }

    return data;
  } catch (error) {
    console.error('Error in fetchCMSData, falling back to local translations:', error);
    return defaultFallbackData;
  }
}
