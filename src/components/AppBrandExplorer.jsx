"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Smartphone,
  Crown,
  Star,
  Wallet,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  X,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import './AppBrandExplorer.css';

const DEFAULT_BRANDS = [
  // --- PREMIUM TIER (20% High-End / Luxury Segment) ---
  {
    name: 'Legrand',
    tier: 'premium',
    sector: 'Electrical',
    itemsEn: 'Luxury Modular Switches, Home Automation & MCBs',
    itemsMl: 'പ്രീമിയം മോഡുലാർ സ്വിച്ചുകൾ, ഹോം ഓട്ടോമേഷൻ',
    origin: 'Global Luxury',
    color: '#D4AF37'
  },
  {
    name: 'Schneider Electric',
    tier: 'premium',
    sector: 'Electrical',
    itemsEn: 'Smart Switchgear, Industrial Panels & Automation',
    itemsMl: 'സ്മാർട്ട് സ്വിച്ച്ഗിയർ, ഇൻഡസ്ട്രിയൽ പാനലുകൾ',
    origin: 'Global Premium',
    color: '#10b981'
  },
  {
    name: 'Kohler',
    tier: 'premium',
    sector: 'Plumbing',
    itemsEn: 'Designer Sanitaryware, Luxury Faucets & Bath Suites',
    itemsMl: 'ലക്ഷ്വറി സാനിറ്ററിവെയർ, ഡിസൈനർ ടാപ്പുകൾ',
    origin: 'International Luxury',
    color: '#0A2E5D'
  },
  {
    name: 'Jaquar Artize',
    tier: 'premium',
    sector: 'Plumbing',
    itemsEn: 'Wellness Bath Fittings, Shower Enclosures & Thermostats',
    itemsMl: 'പ്രീമിയം ബാത്ത് ഫിറ്റിംഗ്സ്, ഷവർ സിസ്റ്റംസ്',
    origin: 'Luxury Line',
    color: '#b45309'
  },
  {
    name: 'Grundfos',
    tier: 'premium',
    sector: 'Pumps',
    itemsEn: 'High-Efficiency Pressure Boosters & Smart Water Pumps',
    itemsMl: 'ഹൈ-എഫിഷ്യൻസി പ്രഷർ ബൂസ്റ്റർ പമ്പുകൾ',
    origin: 'International',
    color: '#0284c7'
  },
  {
    name: 'Philips Smart Lighting',
    tier: 'premium',
    sector: 'Lighting',
    itemsEn: 'Architectural LED, Smart WiFi & Chandelier Lighting',
    itemsMl: 'ആർക്കിടെക്ചറൽ & സ്മാർട്ട് LED ലൈറ്റിംഗ്',
    origin: 'Global Leader',
    color: '#4f46e5'
  },
  {
    name: 'Loom Solar / Enphase',
    tier: 'premium',
    sector: 'Solar',
    itemsEn: 'High-Efficiency Mono PERC Bifacial Panels & Microinverters',
    itemsMl: 'ഹൈ-എഫിഷ്യൻസി സോളാർ പാനലുകൾ & ഇൻവെർട്ടറുകൾ',
    origin: 'Tier-1 Solar',
    color: '#d97706'
  },
  {
    name: 'Yale / Godrej Smart Locks',
    tier: 'premium',
    sector: 'Hardware',
    itemsEn: 'Biometric Digital Door Locks, Video Door Phones & Safes',
    itemsMl: 'ബയോമെട്രിക് ഡിജിറ്റൽ ഡോർ ലോക്കുകൾ, സുരക്ഷാ സിസ്റ്റം',
    origin: 'Smart Security',
    color: '#7c3aed'
  },

  // --- STANDARD TIER (40%-60% Popular Value-for-Money Segment) ---
  {
    name: 'Havells',
    tier: 'standard',
    sector: 'Electrical',
    itemsEn: 'Flame-Retardant Cables, Modular Switches, Fans & Appliances',
    itemsMl: 'വയറുകൾ, സ്വിച്ചുകൾ, ഫാനുകൾ, ഇലക്ട്രിക്കൽ ഉപകരണങ്ങൾ',
    origin: 'Trusted National',
    color: '#dc2626'
  },
  {
    name: 'Finolex Cables & Pipes',
    tier: 'standard',
    sector: 'Electrical',
    itemsEn: 'House Wiring Cables, Conduit Pipes & UV-Protected Fittings',
    itemsMl: 'ഹൗസ് വയറിംഗ് കേബിളുകൾ, പൈപ്പുകൾ',
    origin: 'India Top Brand',
    color: '#2563eb'
  },
  {
    name: 'V-Guard',
    tier: 'standard',
    sector: 'Solar',
    itemsEn: 'Inverters, Stabilizers, Solar Water Heaters & Pumps',
    itemsMl: 'ഇൻവെർട്ടറുകൾ, സ്റ്റെബിലൈസറുകൾ, സോളാർ വാട്ടർ ഹീറ്റർ',
    origin: 'Kerala Favorite',
    color: '#ea580c'
  },
  {
    name: 'Polycab',
    tier: 'standard',
    sector: 'Electrical',
    itemsEn: 'FR/FRLS Wires, Industrial Power Cables & Switchgear',
    itemsMl: 'വയറുകൾ, ഇൻഡസ്ട്രിയൽ കേബിളുകൾ, സ്വിച്ച്ഗിയർ',
    origin: 'National Leader',
    color: '#e11d48'
  },
  {
    name: 'Astral Pipes',
    tier: 'standard',
    sector: 'Plumbing',
    itemsEn: 'CPVC Pro, UPVC, Silencio Low-Noise Drainage Pipes',
    itemsMl: 'CPVC, UPVC പ്ലമ്പിംഗ് പൈപ്പുകളും ഫിറ്റിംഗ്സും',
    origin: 'IS Certified',
    color: '#0369a1'
  },
  {
    name: 'Cera Sanitaryware',
    tier: 'standard',
    sector: 'Plumbing',
    itemsEn: 'Wall-Hung Closets, Wash Basins, CP Taps & Tiles',
    itemsMl: 'ക്ലോസറ്റുകൾ, വാഷ് ബേസിനുകൾ, CP ടാപ്പുകൾ',
    origin: 'Popular Choice',
    color: '#0d9488'
  },
  {
    name: 'Supreme Pipes',
    tier: 'standard',
    sector: 'Plumbing',
    itemsEn: 'Plumbing Systems, Underground Drainage & Water Tanks',
    itemsMl: 'പ്ലമ്പിംഗ് പൈപ്പുകൾ, വാട്ടർ ടാങ്കുകൾ',
    origin: 'National Standard',
    color: '#1d4ed8'
  },
  {
    name: 'Crompton / Kirloskar',
    tier: 'standard',
    sector: 'Pumps',
    itemsEn: 'Domestic Monoblock, Borewell Submersible Pumps & Motors',
    itemsMl: 'ഗാർഹിക മോട്ടോറുകൾ, സബ്മേഴ്സിബിൾ പമ്പുകൾ',
    origin: 'Proven Durability',
    color: '#059669'
  },
  {
    name: 'Luker / Wipro Lighting',
    tier: 'standard',
    sector: 'Lighting',
    itemsEn: 'LED Downlights, Panel Lights, Tube Lights & Floodlights',
    itemsMl: 'LED ലൈറ്റുകൾ, പാനൽ ലൈറ്റുകൾ, സ്ട്രീറ്റ് ലൈറ്റുകൾ',
    origin: 'Energy Star',
    color: '#7c3aed'
  },
  {
    name: 'Anchor by Panasonic',
    tier: 'standard',
    sector: 'Electrical',
    itemsEn: 'Roma Modular Switches, Distribution Boards & Accessories',
    itemsMl: 'റോമ സ്വിച്ചുകൾ, ഡിസ്ട്രിബ്യൂഷൻ ബോർഡുകൾ',
    origin: 'Most Popular',
    color: '#0284c7'
  },

  // --- BUDGET-FRIENDLY TIER (20% Economy / Smart Saver Segment) ---
  {
    name: 'GM / GreatWhite Economy',
    tier: 'budget',
    sector: 'Electrical',
    itemsEn: 'Cost-Effective Switches, Sockets, Extension Boards & Holders',
    itemsMl: 'കുറഞ്ഞ നിരക്കിലുള്ള മികച്ച സ്വിച്ചുകളും സോക്കറ്റുകളും',
    origin: 'Value Range',
    color: '#0891b2'
  },
  {
    name: 'Kelachandra / Star Pipes',
    tier: 'budget',
    sector: 'Plumbing',
    itemsEn: 'ISI PVC Pipes, Agricultural Fittings & Economy Drainage',
    itemsMl: 'ബജറ്റ് ഫ്രണ്ട്‌ലി ISI PVC പൈപ്പുകളും ഫിറ്റിംഗ്സും',
    origin: 'Kerala Economy',
    color: '#16a34a'
  },
  {
    name: 'Parryware / Hindware Essential',
    tier: 'budget',
    sector: 'Plumbing',
    itemsEn: 'Budget-Friendly Sanitaryware, EWC Sets & PVC Cisterns',
    itemsMl: 'മിതമായ നിരക്കിലുള്ള സാനിറ്ററിവെയർ സെറ്റുകൾ',
    origin: 'Smart Budget',
    color: '#0284c7'
  },
  {
    name: 'Surya / Halonix LED',
    tier: 'budget',
    sector: 'Lighting',
    itemsEn: 'Affordable LED Bulbs, Batten Tubes & Utility Lighting',
    itemsMl: 'കുറഞ്ഞ വിലയിലുള്ള ഈടുനിൽക്കുന്ന LED ബൾബുകൾ',
    origin: 'Economy Saver',
    color: '#ca8a04'
  },
  {
    name: 'Texmo / Sharp Economy Pumps',
    tier: 'budget',
    sector: 'Pumps',
    itemsEn: 'Compact Domestic Water Pumps & Agriculture Motors',
    itemsMl: 'സാധാരണ വീടുകൾക്കുള്ള ബജറ്റ് വാട്ടർ പമ്പുകൾ',
    origin: 'Value Motor',
    color: '#0d9488'
  },
  {
    name: 'Microtek / Livguard Value',
    tier: 'budget',
    sector: 'Solar',
    itemsEn: 'Home UPS Inverters, Tubular Batteries & Basic Solar Kits',
    itemsMl: 'ബജറ്റ് ഹോം ഇൻവെർട്ടറുകളും ബാറ്ററികളും',
    origin: 'Budget Backup',
    color: '#dc2626'
  },
  {
    name: 'Doorcarts Assured Selection',
    tier: 'budget',
    sector: 'Hardware',
    itemsEn: 'Direct-from-Factory Hardware, Fasteners, Tools & PVC Taps',
    itemsMl: 'ഡോർകാർട്ട്സ് നേരിട്ട് നൽകുന്ന ഹാർഡ്‌വെയർ & ടൂൾസ്',
    origin: 'Wholesale Direct',
    color: '#0A2E5D'
  }
];

const SECTORS = [
  { id: 'all', en: 'All Categories', ml: 'എല്ലാ വിഭാഗങ്ങളും' },
  { id: 'Electrical', en: 'Electrical', ml: 'ഇലക്ട്രിക്കൽ' },
  { id: 'Plumbing', en: 'Plumbing & Sanitary', ml: 'പ്ലമ്പിംഗ് & സാനിറ്ററി' },
  { id: 'Solar', en: 'Solar & Inverter', ml: 'സോളാർ & ഇൻവെർട്ടർ' },
  { id: 'Lighting', en: 'Lighting', ml: 'ലൈറ്റിംഗ്' },
  { id: 'Pumps', en: 'Pumps & Motors', ml: 'പമ്പുകൾ' },
  { id: 'Hardware', en: 'Hardware & Security', ml: 'ഹാർഡ്‌വെയർ' }
];

export default function AppBrandExplorer({ lang = 'en', t = {} }) {
  const { themeSettings } = useCMS();
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const layoutOption = themeSettings?.appBrandLayout || 'op1'; // Controlled from Admin Panel -> Theme & Animations

  const cmsAppBrands = t?.appBrands || {};
  const brandsList = (cmsAppBrands.brands && cmsAppBrands.brands.length > 0)
    ? cmsAppBrands.brands
    : DEFAULT_BRANDS;

  const playStoreUrl = cmsAppBrands.playStoreUrl || '';
  const appStoreUrl = cmsAppBrands.appStoreUrl || '';

  const tiers = [
    {
      id: 'all',
      icon: Layers,
      badgeEn: 'All Categories',
      badgeMl: 'എല്ലാ വിഭാഗവും',
      titleEn: 'All Brands',
      titleMl: 'എല്ലാ ബ്രാൻഡുകളും',
      descEn: 'Browse all partner companies across every price segment',
      descMl: 'എല്ലാ ബജറ്റിലുമുള്ള മുഴുവൻ കമ്പനികളും കാണുക'
    },
    {
      id: 'premium',
      icon: Crown,
      badgeEn: 'Luxury & Designer',
      badgeMl: 'ലക്ഷ്വറി സീരീസ്',
      titleEn: 'Premium & Luxury',
      titleMl: 'പ്രീമിയം & ലക്ഷ്വറി',
      descEn: 'International & luxury architectural brands for premium villas & commercial projects',
      descMl: 'വലിയ പ്രോജക്ടുകൾക്കും വില്ലകൾക്കും അനുയോജ്യമായ പ്രീമിയം ബ്രാൻഡുകൾ'
    },
    {
      id: 'standard',
      icon: Star,
      badgeEn: 'Most Popular',
      badgeMl: 'ഏറ്റവും ജനപ്രിയം',
      titleEn: 'Popular & Standard',
      titleMl: 'ജനപ്രിയ സ്റ്റാൻഡേർഡ്',
      descEn: 'Trusted, long-lasting national brands ideal for homes & offices',
      descMl: 'വീടുകൾക്കും സ്ഥാപനങ്ങൾക്കും ഏറ്റവും അനുയോജ്യമായ ജനപ്രിയ ബ്രാൻഡുകൾ'
    },
    {
      id: 'budget',
      icon: Wallet,
      badgeEn: 'Value & Economy',
      badgeMl: 'മിതമായ നിരക്ക്',
      titleEn: 'Budget Friendly',
      titleMl: 'ബജറ്റ് ഫ്രണ്ട്‌ലി',
      descEn: 'Reliable, ISI-certified economy brands that fit smart construction budgets',
      descMl: 'കുറഞ്ഞ ചിലവിൽ ഗുണമേന്മയുള്ള സാധനങ്ങൾ ആഗ്രഹിക്കുന്നവർക്കായി'
    }
  ];

  const filteredBrands = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return brandsList.filter((b) => {
      const matchesSearch = !q ||
        b.name.toLowerCase().includes(q) ||
        (b.sector && b.sector.toLowerCase().includes(q)) ||
        (b.itemsEn && b.itemsEn.toLowerCase().includes(q)) ||
        (b.itemsMl && b.itemsMl.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (q) {
        return selectedSector === 'all' || b.sector === selectedSector;
      }

      const matchesTier = selectedTier === 'all' || b.tier === selectedTier;
      const matchesSector = selectedSector === 'all' || b.sector === selectedSector;
      return matchesTier && matchesSector;
    });
  }, [brandsList, selectedTier, selectedSector, searchQuery]);

  const getTierMeta = (tierId) => {
    if (tierId === 'premium') {
      return {
        label: lang === 'en' ? 'Premium' : 'പ്രീമിയം',
        className: 'tier-pill-premium',
        Icon: Crown
      };
    }
    if (tierId === 'standard') {
      return {
        label: lang === 'en' ? 'Standard' : 'സ്റ്റാൻഡേർഡ്',
        className: 'tier-pill-standard',
        Icon: Star
      };
    }
    return {
      label: lang === 'en' ? 'Budget Friendly' : 'ബജറ്റ് ഫ്രണ്ട്‌ലി',
      className: 'tier-pill-budget',
      Icon: Wallet
    };
  };

  const activeTierObj = tiers.find((tr) => tr.id === selectedTier) || tiers[0];

  const renderStoreButtons = (extraClass = '') => (
    <div className={`abe-store-buttons ${extraClass}`}>
      <a
        href={playStoreUrl && playStoreUrl !== '#' ? playStoreUrl : '/contact?subject=Product&topic=Doorcarts%20Android%20App%20Link'}
        target={playStoreUrl && playStoreUrl !== '#' ? '_blank' : undefined}
        rel={playStoreUrl && playStoreUrl !== '#' ? 'noopener noreferrer' : undefined}
        className="abe-store-btn"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
          <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
        </svg>
        <div className="abe-store-btn-text">
          <small>{lang === 'en' ? 'GET IT ON' : 'ഡൗൺലോഡ് ചെയ്യാം'}</small>
          <strong>Google Play</strong>
        </div>
      </a>

      <a
        href={appStoreUrl && appStoreUrl !== '#' ? appStoreUrl : '/contact?subject=Product&topic=Doorcarts%20iOS%20App%20Link'}
        target={appStoreUrl && appStoreUrl !== '#' ? '_blank' : undefined}
        rel={appStoreUrl && appStoreUrl !== '#' ? 'noopener noreferrer' : undefined}
        className="abe-store-btn"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.33c.64-.78 1.08-1.86.96-2.94-.93.04-2.06.62-2.72 1.4-.58.68-1.1 1.79-.96 2.84 1.04.08 2.08-.52 2.72-1.3z" />
        </svg>
        <div className="abe-store-btn-text">
          <small>{lang === 'en' ? 'DOWNLOAD ON THE' : 'ഡൗൺലോഡ് ചെയ്യാം'}</small>
          <strong>App Store</strong>
        </div>
      </a>
    </div>
  );

  return (
    <section id="app-brands" className="section app-brands-sec">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">
            {cmsAppBrands.label || (lang === 'en' ? 'DOORCARTS APP & PARTNER BRANDS' : 'മൊബൈൽ ആപ്പും ബ്രാൻഡുകളും')}
          </span>
          <h2 className="section-title">
            {cmsAppBrands.title || (lang === 'en'
              ? 'Every Brand for Every Budget — In One App'
              : 'നിങ്ങളുടെ ബജറ്റിന് ഇണങ്ങുന്ന എല്ലാ കമ്പനികളും ഒറ്റ ആപ്പിൽ')}
          </h2>
          <p className="section-subtitle">
            {cmsAppBrands.subtitle || (lang === 'en'
              ? 'Check whether your preferred company and budget range are available right here before downloading the Doorcarts app.'
              : 'ആപ്പ് ഡൗൺലോഡ് ചെയ്യുന്നതിന് മുൻപ് തന്നെ നിങ്ങൾ ഉദ്ദേശിക്കുന്ന കമ്പനിയും ബജറ്റിന് പറ്റിയ ഉൽപ്പന്നങ്ങളും ഉണ്ടോ എന്ന് ഇവിടെ പരിശോധിക്കാം.')}
          </p>
        </div>

        {/* Main Showcase Grid (Full Width for Option 1, Phone + Explorer for Option 2) */}
        <div className={`abe-layout ${layoutOption === 'op1' ? 'abe-layout-full' : 'abe-layout-split'}`}>
          {/* OPTION 2 LEFT COLUMN: Realistic Interactive Smartphone App Mockup */}
          {layoutOption === 'op2' && (
            <div className="abe-phone-wrapper">
              <div className="abe-phone-frame">
                {/* Phone Top Notch */}
                <div className="abe-phone-notch">
                  <span className="abe-phone-speaker" />
                  <span className="abe-phone-camera" />
                </div>

                {/* Phone Screen Content */}
                <div className="abe-phone-screen">
                  {/* App Header Bar inside Phone */}
                  <div className="abe-phone-appbar">
                    <div className="abe-phone-brand">
                      <div className="abe-phone-logo">D</div>
                      <div>
                        <strong>{cmsAppBrands.appName || 'Doorcarts'}</strong>
                        <small>{lang === 'en' ? 'by Dorek International' : 'ഡോർകാർട്ട്സ് ആപ്പ്'}</small>
                      </div>
                    </div>
                    <span className="abe-phone-live-pill">● LIVE</span>
                  </div>

                  {/* Mini Hero Banner inside Phone */}
                  <div className="abe-phone-hero">
                    <span className="abe-phone-hero-tag">
                      <Sparkles size={11} /> {lang === 'en' ? activeTierObj.titleEn : activeTierObj.titleMl}
                    </span>
                    <h4>
                      {lang === 'en'
                        ? '10,000+ Genuine Products Ready to Order'
                        : '10,000+ ഒറിജിനൽ ഉൽപ്പന്നങ്ങൾ ഒറ്റ ക്ലിക്കിൽ'}
                    </h4>
                    <p>
                      {lang === 'en'
                        ? 'Wholesale & retail rates with direct Kerala delivery'
                        : 'മിതമായ നിരക്കിൽ കേരളത്തിലുടനീളം ഡെലിവറി'}
                    </p>
                  </div>

                  {/* Live Synced Brand Preview inside Phone */}
                  <div className="abe-phone-section-title">
                    <span>
                      {lang === 'en' ? 'Showing in App' : 'ആപ്പിൽ ലഭ്യമായവ'} ({filteredBrands.length})
                    </span>
                    <small>{selectedSector === 'all' ? 'All Sectors' : selectedSector}</small>
                  </div>

                  <div className="abe-phone-cards">
                    {filteredBrands.slice(0, 4).map((b, i) => (
                      <div key={i} className="abe-phone-item">
                        <div
                          className="abe-phone-item-icon"
                          style={{ background: `${b.color || '#0A2E5D'}18`, color: b.color || '#0A2E5D' }}
                        >
                          {b.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="abe-phone-item-info">
                          <strong>{b.name}</strong>
                          <span>{b.sector} • {b.tier === 'premium' ? '👑 Luxury' : b.tier === 'standard' ? '⭐ Popular' : '💰 Economy'}</span>
                        </div>
                        <span className="abe-phone-item-check">✓</span>
                      </div>
                    ))}
                  </div>

                  {/* Perks Strip inside Phone */}
                  <div className="abe-phone-trust">
                    <span><CheckCircle2 size={12} /> Genuine Warranty</span>
                    <span><CheckCircle2 size={12} /> GST Billing</span>
                  </div>
                </div>

                {/* Phone Bottom Download Dock */}
                <div className="abe-phone-dock">
                  <div className="abe-phone-dock-label">
                    {lang === 'en' ? 'Download Official App' : 'ആപ്പ് ഡൗൺലോഡ് ചെയ്യാം'}
                  </div>
                  {renderStoreButtons('abe-store-buttons-compact')}
                </div>
              </div>
            </div>
          )}

          {/* MAIN BRAND & BUDGET EXPLORER PANEL */}
          <div className="abe-explorer-panel">
            {/* Top Search Bar + Tier Tabs */}
            <div className="abe-controls-top">
              <div className="abe-search-wrapper">
                <Search size={18} className="abe-search-icon" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    lang === 'en'
                      ? 'Search company name or item (e.g. Legrand, Finolex, V-Guard, Solar)...'
                      : 'കമ്പനിയുടെ പേരോ ഉൽപ്പന്നമോ തിരയുക (ഉദാ: Legrand, Finolex, V-Guard)...'
                  }
                  className="abe-search-input"
                  aria-label="Search company or brand name"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="abe-search-clear"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* 3-Tier Budget Tabs */}
              <div className="abe-tier-tabs" role="tablist">
                {tiers.map((tr) => {
                  const Icon = tr.icon;
                  const isActive = !searchQuery && selectedTier === tr.id;
                  return (
                    <button
                      key={tr.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`abe-tier-tab tier-${tr.id} ${isActive ? 'active' : ''}`}
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedTier(tr.id);
                      }}
                    >
                      <Icon size={17} />
                      <div className="abe-tier-tab-text">
                        <span>{lang === 'en' ? tr.titleEn : tr.titleMl}</span>
                        <small>{lang === 'en' ? tr.badgeEn : tr.badgeMl}</small>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Sector Filter Pills */}
              <div className="abe-sector-pills">
                {SECTORS.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    className={`abe-sector-pill ${selectedSector === sec.id ? 'active' : ''}`}
                    onClick={() => setSelectedSector(sec.id)}
                  >
                    {lang === 'en' ? sec.en : sec.ml}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Tier Banner Info */}
            <div className="abe-tier-summary">
              <div className="abe-tier-summary-left">
                <ShieldCheck size={18} className="abe-summary-icon" />
                <span>
                  {searchQuery
                    ? (lang === 'en'
                        ? `Showing results for "${searchQuery}" across all budget tiers`
                        : `"${searchQuery}" എന്നതിനായുള്ള കമ്പനികൾ`)
                    : (lang === 'en' ? activeTierObj.descEn : activeTierObj.descMl)}
                </span>
              </div>
              <span className="abe-brand-count">
                {filteredBrands.length} {lang === 'en' ? 'Brands' : 'കമ്പനികൾ'}
              </span>
            </div>

            {/* Brand Cards Grid */}
            {filteredBrands.length > 0 ? (
              <div className={`abe-brands-grid ${layoutOption === 'op1' ? 'abe-brands-grid-4' : 'abe-brands-grid-3'}`}>
                {filteredBrands.map((brand, idx) => {
                  const tierMeta = getTierMeta(brand.tier);
                  const TierIcon = tierMeta.Icon;
                  const initials = brand.name
                    .split(/[\s/]+/)
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join('')
                    .toUpperCase();

                  return (
                    <div key={`${brand.name}-${idx}`} className="abe-brand-card">
                      <div className="abe-brand-card-top">
                        <div
                          className="abe-brand-avatar"
                          style={{
                            background: `${brand.color || '#0A2E5D'}15`,
                            color: brand.color || '#0A2E5D',
                            borderColor: `${brand.color || '#0A2E5D'}35`
                          }}
                        >
                          {brand.logo ? (
                            <img src={brand.logo} alt={brand.name} />
                          ) : (
                            <span>{initials}</span>
                          )}
                        </div>
                        <span className={`abe-tier-pill ${tierMeta.className}`}>
                          <TierIcon size={12} />
                          {tierMeta.label}
                        </span>
                      </div>

                      <h4 className="abe-brand-name">{brand.name}</h4>
                      <p className="abe-brand-items">
                        {lang === 'en' ? brand.itemsEn : (brand.itemsMl || brand.itemsEn)}
                      </p>

                      <div className="abe-brand-footer">
                        <span className="abe-brand-sector">{brand.sector}</span>
                        <span className="abe-brand-status">
                          <span className="abe-status-dot" />
                          {lang === 'en' ? 'Available in App' : 'ആപ്പിൽ ലഭ്യമാണ്'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Smart Fallback when searching for a brand not yet listed */
              <div className="abe-empty-search">
                <h4>
                  {lang === 'en'
                    ? `Looking for "${searchQuery}"?`
                    : `"${searchQuery}" ബ്രാൻഡ് ആണോ നിങ്ങൾ തിരയുന്നത്?`}
                </h4>
                <p>
                  {lang === 'en'
                    ? 'We supply 100+ additional partner brands across Premium, Standard, and Economy segments on direct order. Contact our team for instant stock & price confirmation!'
                    : 'ഇവിടെ കാണുന്നതിന് പുറമെ നൂറിലധികം മറ്റ് ബ്രാൻഡുകളും ഞങ്ങൾ വഴി ലഭ്യമാണ്. വിലയും സ്റ്റോക്കും അറിയാൻ ഞങ്ങളുമായി ബന്ധപ്പെടുക!'}
                </p>
                <Link
                  href={`/contact?subject=Product&topic=${encodeURIComponent(`Brand Enquiry: ${searchQuery}`)}`}
                  className="btn btn-primary btn-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
                >
                  <span>{lang === 'en' ? `Enquire About "${searchQuery}"` : `"${searchQuery}" വിവരങ്ങൾ ചോദിക്കുക`}</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            )}

            {/* OPTION 1 SLEEK HORIZONTAL APP DOWNLOAD BANNER */}
            {layoutOption === 'op1' ? (
              <div className="abe-horizontal-app-banner">
                <div className="abe-hab-left">
                  <div className="abe-hab-badge-row">
                    <span className="abe-hab-badge">
                      <Smartphone size={14} />
                      {lang === 'en' ? 'OFFICIAL PRODUCTS APP' : 'ഒഫീഷ്യൽ മൊബൈൽ ആപ്പ്'}
                    </span>
                    <span className="abe-hab-appname">
                      {cmsAppBrands.appName || (lang === 'en' ? 'Doorcarts by Dorek' : 'ഡോർകാർട്ട്സ് ആപ്പ്')}
                    </span>
                  </div>
                  <h3 className="abe-hab-title">
                    {lang === 'en'
                      ? 'Found Your Preferred Brand? Check Live Prices & Order on the App!'
                      : 'നിങ്ങൾ ഉദ്ദേശിച്ച കമ്പനി കണ്ടില്ലേ? ലൈവ് വിലയും ഓഫറുകളും അറിയാൻ ആപ്പ് ഡൗൺലോഡ് ചെയ്യൂ!'}
                  </h3>
                  <p className="abe-hab-desc">
                    {cmsAppBrands.appDesc || (lang === 'en'
                      ? 'Explore 10,000+ electrical, plumbing, solar, lighting, and sanitaryware products with wholesale & retail rates across all 14 districts in Kerala.'
                      : 'ഇലക്ട്രിക്കൽ, പ്ലമ്പിംഗ്, സോളാർ, സാനിറ്ററി മേഖലകളിലെ 10,000+ ഉൽപ്പന്നങ്ങൾ കമ്പനി വാറന്റിയോടെ കേരളത്തിലുടനീളം ലഭ്യമാണ്.')}
                  </p>
                  <div className="abe-hab-perks">
                    <span><CheckCircle2 size={15} /> {lang === 'en' ? 'Live Price Comparison' : 'വില താരതമ്യം ചെയ്യാം'}</span>
                    <span><CheckCircle2 size={15} /> {lang === 'en' ? '100% Genuine Warranty' : '100% കമ്പനി വാറന്റി'}</span>
                    <span><CheckCircle2 size={15} /> {lang === 'en' ? 'All-Kerala Delivery' : 'കേരളത്തിലുടനീളം ഡെലിവറി'}</span>
                  </div>
                </div>

                <div className="abe-hab-right">
                  {renderStoreButtons('abe-hab-stores')}
                  <Link
                    href={`/contact?subject=Product&topic=${encodeURIComponent(`Brand Quotation (${activeTierObj.titleEn})`)}`}
                    className="abe-hab-quote-btn"
                  >
                    <span>{lang === 'en' ? 'Need Bulk Project Quote? Contact Us' : 'പ്രോജക്ട് കൊട്ടേഷൻ വേണോ? ബന്ധപ്പെടാം'}</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ) : (
              /* Bottom Conversion Bar for Option 2 */
              <div className="abe-bottom-cta">
                <p>
                  {lang === 'en'
                    ? 'Need a custom quotation for your home, villa, or commercial project based on your budget?'
                    : 'നിങ്ങളുടെ ബജറ്റിന് അനുസരിച്ച് വീടിനോ പ്രോജക്ടിനോ ആവശ്യമായ കൊട്ടേഷൻ വേണോ?'}
                </p>
                <Link
                  href={`/contact?subject=Product&topic=${encodeURIComponent(`Brand Quotation (${activeTierObj.titleEn})`)}`}
                  className="abe-quote-link"
                >
                  <span>{lang === 'en' ? 'Get Budget-Wise Quote' : 'ബജറ്റ് കൊട്ടേഷൻ നേടുക'}</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
