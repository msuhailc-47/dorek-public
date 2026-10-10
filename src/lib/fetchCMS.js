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

// In-memory server cache to avoid repetitive network calls across concurrent requests in production
let inMemoryCache = null;
let lastCacheTime = 0;
const isDev = process.env.NODE_ENV === 'development';
const CACHE_TTL = isDev ? 0 : 15 * 1000;

export async function fetchCMSData() {
  const now = Date.now();
  if (!isDev && inMemoryCache && (now - lastCacheTime < CACHE_TTL)) {
    return inMemoryCache;
  }

  const projectId = 'dorek-international-3ef93';
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/dorek_cms`;
  
  try {
    // 2.5s timeout prevents hanging if Firestore or connection has latency
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), 2500) : null;

    const res = await fetch(url, { 
      signal: controller ? controller.signal : undefined,
      ...(isDev ? { cache: 'no-store' } : { next: { revalidate: 15 } })
    });
    
    if (timeoutId) clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn('Could not fetch remote CMS data from Firestore, using local fallback.');
      return inMemoryCache || defaultFallbackData;
    }

    const json = await res.json();
    if (!json || !json.documents) {
      return inMemoryCache || defaultFallbackData;
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
    } else {
      data.translationsData = {
        en: {
          ...translations.en,
          ...(data.translationsData.en || {}),
          hero: {
            ...translations.en.hero,
            ...(data.translationsData.en?.hero || {}),
            stats: {
              ...translations.en.hero.stats,
              ...(data.translationsData.en?.hero?.stats || {}),
              counts: {
                ...translations.en.hero.stats.counts,
                ...(data.translationsData.en?.hero?.stats?.counts || {})
              }
            }
          },
          about: {
            ...translations.en.about,
            ...(data.translationsData.en?.about || {}),
            founders: (data.translationsData.en?.about?.founders && data.translationsData.en.about.founders.length > 0)
              ? data.translationsData.en.about.founders
              : translations.en.about.founders
          }
        },
        ml: {
          ...translations.ml,
          ...(data.translationsData.ml || {}),
          hero: {
            ...translations.ml.hero,
            ...(data.translationsData.ml?.hero || {}),
            stats: {
              ...translations.ml.hero.stats,
              ...(data.translationsData.ml?.hero?.stats || {}),
              counts: {
                ...translations.ml.hero.stats.counts,
                ...(data.translationsData.ml?.hero?.stats?.counts || {})
              }
            }
          },
          about: {
            ...translations.ml.about,
            ...(data.translationsData.ml?.about || {}),
            founders: (data.translationsData.ml?.about?.founders && data.translationsData.ml.about.founders.length > 0)
              ? data.translationsData.ml.about.founders
              : translations.ml.about.founders
          }
        }
      };
    }

    inMemoryCache = data;
    lastCacheTime = Date.now();
    return data;
  } catch (error) {
    console.error('Error in fetchCMSData, falling back to local translations:', error);
    return inMemoryCache || defaultFallbackData;
  }
}
