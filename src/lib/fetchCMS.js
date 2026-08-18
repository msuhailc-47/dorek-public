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

export async function fetchCMSData() {
  const projectId = 'dorek-international-3ef93';
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/dorek_cms`;
  
  // Next.js ISR: Revalidate every 10 seconds for fast admin updates
  const res = await fetch(url, { next: { revalidate: 10 } });
  
  if (!res.ok) {
    console.error('Failed to fetch CMS data');
    return null;
  }

  const json = await res.json();
  const data = {};

  json.documents.forEach((doc) => {
    const id = doc.name.split('/').pop();
    const parsedFields = {};
    for (const [k, v] of Object.entries(doc.fields || {})) {
      parsedFields[k] = parseFirestoreValue(v);
    }
    // Unwrap the top level key since our migration script wrapped them like { themeSettings: { ... } }
    data[id] = parsedFields[id] !== undefined ? parsedFields[id] : parsedFields;
  });

  return data;
}
