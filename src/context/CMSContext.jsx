"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lock, Unlock, ShieldAlert, Wrench, Eye } from 'lucide-react';

const CMSContext = createContext(null);

// Helper to parse Firestore REST value
const parseVal = (v) => {
  if (!v) return null;
  if ('stringValue' in v) return v.stringValue;
  if ('booleanValue' in v) return v.booleanValue;
  if ('integerValue' in v) return parseInt(v.integerValue, 10);
  if ('doubleValue' in v) return parseFloat(v.doubleValue);
  if ('mapValue' in v) {
    const o = {};
    for (const [k, val] of Object.entries(v.mapValue.fields || {})) o[k] = parseVal(val);
    return o;
  }
  return null;
};

export function CMSProvider({ children, initialData }) {
  if (!initialData) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Loading Enterprise CMS Data...</div>;
  }

  const { translationsData, themeSettings, sectionVisibility, codeSettings, customSections, navigation } = initialData;
  const [lang, setLang] = useState('en');
  const [liveTheme, setLiveTheme] = useState(themeSettings || {});
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPinBox, setShowPinBox] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (sessionStorage.getItem('dorek_maintenance_bypass') === 'true') {
        setIsUnlocked(true);
      }
    }

    // Fetch live themeSettings directly from Firestore REST API so Maintenance toggle is instant
    const fetchLiveTheme = async () => {
      try {
        const res = await fetch(
          `https://firestore.googleapis.com/v1/projects/dorek-international-3ef93/databases/(default)/documents/dorek_cms/themeSettings?t=${Date.now()}`,
          { cache: 'no-store' }
        );
        if (res.ok) {
          const doc = await res.json();
          if (doc && doc.fields) {
            const parsed = {};
            for (const [k, v] of Object.entries(doc.fields)) {
              parsed[k] = parseVal(v);
            }
            const actualTheme = parsed.themeSettings !== undefined ? parsed.themeSettings : parsed;
            if (actualTheme) {
              setLiveTheme(prev => ({ ...prev, ...actualTheme }));
            }
          }
        }
      } catch (e) {
        // Silent fallback to server initialData
      }
    };

    fetchLiveTheme();
  }, []);

  const t = translationsData && translationsData[lang] ? translationsData[lang] : null;

  const fallbackCustomSections = (t && t.customSections && t.customSections.length > 0)
    ? t.customSections
    : (translationsData?.en?.customSections || []);

  const getAnimationClass = () => 'animate-fadeIn';
  const isSectionVisible = (id) => sectionVisibility ? sectionVisibility[id] !== false : true;

  const addSubmission = async (formData) => {
    try {
      await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (error) {
      console.error("Error adding submission: ", error);
    }
  };

  if (!t) return null;

  const isMaintenanceActive = liveTheme?.maintenanceMode !== undefined ? Boolean(liveTheme.maintenanceMode) : true;
  const expectedPin = String(liveTheme?.maintenancePin || '2026').trim();

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput.trim() === expectedPin) {
      sessionStorage.setItem('dorek_maintenance_bypass', 'true');
      setIsUnlocked(true);
      setPinError('');
      setPinInput('');
    } else {
      setPinError('Incorrect Admin PIN. Please try again.');
    }
  };

  const handleRelock = () => {
    sessionStorage.removeItem('dorek_maintenance_bypass');
    setIsUnlocked(false);
    setShowPinBox(false);
  };

  // Render Maintenance Screen if active and not unlocked by Admin PIN
  if (isMaintenanceActive && !isUnlocked) {
    return (
      <div style={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(135deg, #061A38 0%, #0A2E5D 55%, #0F3B75 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        color: '#ffffff',
        fontFamily: "'Segoe UI', Inter, system-ui, sans-serif",
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '580px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: '24px',
          padding: '44px 32px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)'
        }}>
          {/* Brand Logo */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '28px' }}>
            <div style={{ background: '#ffffff', padding: '8px', borderRadius: '12px', display: 'flex' }}>
              <img src="/logo.png" alt="Dorek Logo" style={{ height: '38px', width: 'auto', objectFit: 'contain' }} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '1.5px', color: '#ffffff', lineHeight: 1 }}>DOREK</div>
              <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2.5px', color: '#D4AF37', marginTop: '4px' }}>INTERNATIONAL</div>
            </div>
          </div>

          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(212, 175, 55, 0.15)',
            border: '1px solid rgba(212, 175, 55, 0.45)',
            color: '#F3D060',
            padding: '6px 16px',
            borderRadius: '30px',
            fontSize: '12px',
            fontWeight: '700',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}>
            <Wrench size={14} /> Scheduled Maintenance & Upgrade
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 10px 0', color: '#ffffff', lineHeight: 1.3 }}>
            {liveTheme?.maintenanceTitle || 'We Are Upgrading Our Website'}
          </h1>
          <p style={{ fontSize: '15px', color: '#D4AF37', fontWeight: '600', margin: '0 0 18px 0' }}>
            വെബ്‌സൈറ്റിൽ നവീകരണ പ്രവർത്തനങ്ങൾ നടന്നുകൊണ്ടിരിക്കുന്നു
          </p>

          {/* Description */}
          <p style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.82)', lineHeight: 1.7, margin: '0 0 30px 0' }}>
            {liveTheme?.maintenanceMessage || 'We are currently making important updates and improvements to serve you better. Our website will be back online shortly. Thank you for your patience!'}
          </p>

          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.12)', paddingTop: '22px', marginTop: '10px' }}>
            {!showPinBox ? (
              <button
                onClick={() => setShowPinBox(true)}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: 'rgba(255, 255, 255, 0.75)',
                  padding: '8px 18px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Lock size={13} /> Admin Preview Access
              </button>
            ) : (
              <form onSubmit={handlePinSubmit} style={{ maxWidth: '320px', margin: '0 auto' }}>
                <div style={{ fontSize: '12px', color: '#D4AF37', fontWeight: '600', marginBottom: '8px' }}>
                  Enter Admin PIN to preview & edit live website:
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="password"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="Enter PIN"
                    autoFocus
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      background: 'rgba(0, 0, 0, 0.3)',
                      color: '#ffffff',
                      fontSize: '14px',
                      textAlign: 'center',
                      letterSpacing: '3px'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: '10px 18px',
                      borderRadius: '10px',
                      border: 'none',
                      background: '#D4AF37',
                      color: '#0A2E5D',
                      fontWeight: '700',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    Unlock
                  </button>
                </div>
                {pinError && (
                  <div style={{ color: '#f87171', fontSize: '12px', marginTop: '8px', fontWeight: '600' }}>
                    {pinError}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>

        <div style={{ marginTop: '24px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)' }}>
          © {new Date().getFullYear()} Dorek International Enterprises LLP. All rights reserved.
        </div>
      </div>
    );
  }

  return (
    <CMSContext.Provider value={{
      lang,
      setLang,
      t,
      themeSettings: liveTheme || {},
      sectionVisibility: sectionVisibility || {},
      isSectionVisible,
      codeSettings: codeSettings || {},
      customSections: fallbackCustomSections,
      navigation: navigation || [],
      getAnimationClass,
      addSubmission
    }}>
      {children}

      {/* Floating Admin Preview Banner when Maintenance Mode is ON but Admin unlocked it */}
      {isMaintenanceActive && isUnlocked && (
        <div style={{
          position: 'fixed',
          bottom: '16px',
          left: '16px',
          zIndex: 99999,
          background: '#0A2E5D',
          color: '#ffffff',
          border: '2px solid #D4AF37',
          borderRadius: '30px',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.35)',
          fontSize: '12px',
          fontWeight: '600'
        }}>
          <Eye size={15} color="#D4AF37" />
          <span>Admin Preview Mode <span style={{ color: '#f87171' }}>(Site Locked for Public)</span></span>
          <button
            onClick={handleRelock}
            style={{
              background: '#ef4444',
              color: '#ffffff',
              border: 'none',
              borderRadius: '20px',
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Lock View
          </button>
        </div>
      )}
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
