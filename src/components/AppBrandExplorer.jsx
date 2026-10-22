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
  X,
  Layers,
  ShieldCheck,
  Building2,
  BadgeCheck
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { convertDriveUrl } from '../utils/getOptimizedUrl';
import './AppBrandExplorer.css';

// SVG Brand Logos / Official Emblems
function BrandLogo({ brandName }) {
  const name = (brandName || '').toLowerCase();

  if (name.includes('legrand')) {
    return (
      <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg-logo">
        <rect x="2" y="4" width="136" height="28" rx="4" fill="#E21836" />
        <text x="70" y="23" fill="#FFFFFF" fontSize="16" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.5">legrand</text>
      </svg>
    );
  }
  if (name.includes('schneider')) {
    return (
      <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg-logo">
        <rect x="2" y="2" width="136" height="32" rx="6" fill="#F0FDF4" stroke="#009E4D" strokeWidth="1.2" />
        <path d="M16 18c0-5 4-9 9-9 3.5 0 6.5 2 8 5l-3.5 1.8c-1-1.8-2.5-2.8-4.5-2.8-2.8 0-5 2.2-5 5s2.2 5 5 5c2 0 3.5-1 4.5-2.8l3.5 1.8c-1.5 3-4.5 5-8 5-5 0-9-4-9-9z" fill="#009E4D"/>
        <text x="76" y="23" fill="#009E4D" fontSize="13" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.2">Schneider</text>
      </svg>
    );
  }
  if (name.includes('kohler')) {
    return (
      <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg-logo">
        <text x="70" y="24" fill="#0A2E5D" fontSize="19" fontWeight="900" fontFamily="serif" textAnchor="middle" letterSpacing="3">KOHLER</text>
      </svg>
    );
  }
  if (name.includes('jaquar') || name.includes('artize')) {
    return (
      <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg-logo">
        <text x="70" y="19" fill="#1E293B" fontSize="15" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="2.5">ARTIZE</text>
        <text x="70" y="30" fill="#B45309" fontSize="8" fontWeight="700" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1.5">BY JAQUAR</text>
      </svg>
    );
  }
  if (name.includes('grundfos')) {
    return (
      <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg-logo">
        <circle cx="22" cy="18" r="10" stroke="#003366" strokeWidth="2.5" fill="none"/>
        <path d="M22 11v14M15 18h14" stroke="#003366" strokeWidth="2"/>
        <text x="40" y="23" fill="#003366" fontSize="14" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">GRUNDFOS</text>
      </svg>
    );
  }
  if (name.includes('philips')) {
    return (
      <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg-logo">
        <rect x="2" y="3" width="136" height="30" rx="6" fill="#0B5FFF" />
        <text x="70" y="23" fill="#FFFFFF" fontSize="16" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1.5">PHILIPS</text>
      </svg>
    );
  }
  if (name.includes('loom') || name.includes('enphase')) {
    return (
      <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg-logo">
        <circle cx="20" cy="18" r="9" fill="#F59E0B" />
        <path d="M20 7v3M20 26v3M9 18h3M28 18h3" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
        <text x="36" y="23" fill="#B45309" fontSize="12" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.5">LOOM SOLAR</text>
      </svg>
    );
  }
  if (name.includes('yale') || name.includes('godrej')) {
    return (
      <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg-logo">
        <rect x="8" y="10" width="16" height="18" rx="3" fill="#EAB308" />
        <path d="M12 10V6a4 4 0 0 1 8 0v4" stroke="#CA8A04" strokeWidth="2" fill="none"/>
        <text x="30" y="23" fill="#1E293B" fontSize="12" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.8">YALE · GODREJ</text>
      </svg>
    );
  }
  if (name.includes('havells')) {
    return (
      <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg-logo">
        <polygon points="12,26 22,10 32,26" fill="#E11D48"/>
        <text x="38" y="23" fill="#E11D48" fontSize="16" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.8">HAVELLS</text>
      </svg>
    );
  }
  if (name.includes('finolex')) {
    return (
      <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg-logo">
        <text x="70" y="21" fill="#1D4ED8" fontSize="18" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fontStyle="italic" letterSpacing="0.5">Finolex</text>
        <rect x="25" y="26" width="90" height="3" rx="1.5" fill="#EA580C" />
      </svg>
    );
  }
  if (name.includes('v-guard')) {
    return (
      <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg-logo">
        <rect x="2" y="4" width="136" height="28" rx="6" fill="#EA580C" />
        <text x="70" y="23" fill="#FFFFFF" fontSize="15" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">V-GUARD</text>
      </svg>
    );
  }
  if (name.includes('polycab')) {
    return (
      <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg-logo">
        <polygon points="20,10 28,18 20,26 12,18" fill="#DC2626" />
        <text x="36" y="23" fill="#DC2626" fontSize="15" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.8">POLYCAB</text>
      </svg>
    );
  }
  if (name.includes('astral')) {
    return (
      <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg-logo">
        <path d="M12 24c4-12 12-12 16 0" stroke="#0284C7" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <circle cx="20" cy="14" r="3" fill="#0284C7"/>
        <text x="38" y="23" fill="#0284C7" fontSize="16" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">ASTRAL</text>
      </svg>
    );
  }
  if (name.includes('cera')) {
    return (
      <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg-logo">
        <circle cx="20" cy="18" r="9" stroke="#0D9488" strokeWidth="3" fill="none"/>
        <text x="38" y="24" fill="#0D9488" fontSize="17" fontWeight="900" fontFamily="sans-serif" letterSpacing="1.5">CERA</text>
      </svg>
    );
  }
  if (name.includes('supreme')) {
    return (
      <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg-logo">
        <rect x="2" y="3" width="136" height="30" rx="5" fill="#1E40AF" />
        <text x="70" y="23" fill="#FFFFFF" fontSize="16" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fontStyle="italic" letterSpacing="0.8">Supreme</text>
      </svg>
    );
  }
  if (name.includes('crompton') || name.includes('kirloskar')) {
    return (
      <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg-logo">
        <circle cx="20" cy="18" r="8" fill="#059669"/>
        <text x="36" y="23" fill="#059669" fontSize="14" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.5">Crompton</text>
      </svg>
    );
  }
  if (name.includes('luker') || name.includes('wipro')) {
    return (
      <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg-logo">
        <text x="70" y="22" fill="#7C3AED" fontSize="15" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">LUKER · WIPRO</text>
      </svg>
    );
  }
  if (name.includes('anchor') || name.includes('panasonic')) {
    return (
      <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg-logo">
        <text x="70" y="19" fill="#00438C" fontSize="15" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">ANCHOR</text>
        <text x="70" y="29" fill="#64748B" fontSize="8" fontWeight="700" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.8">BY PANASONIC</text>
      </svg>
    );
  }
  if (name.includes('gm') || name.includes('greatwhite')) {
    return (
      <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg-logo">
        <rect x="10" y="7" width="22" height="22" rx="4" fill="#0891B2"/>
        <text x="21" y="23" fill="#FFFFFF" fontSize="12" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">GM</text>
        <text x="40" y="23" fill="#0891B2" fontSize="13" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.5">MODULAR</text>
      </svg>
    );
  }
  if (name.includes('kelachandra') || name.includes('star')) {
    return (
      <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg-logo">
        <text x="70" y="23" fill="#16A34A" fontSize="14" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.8">KELACHANDRA</text>
      </svg>
    );
  }
  if (name.includes('parryware') || name.includes('hindware')) {
    return (
      <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg-logo">
        <text x="70" y="23" fill="#0284C7" fontSize="14" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.8">PARRYWARE</text>
      </svg>
    );
  }
  if (name.includes('surya') || name.includes('halonix')) {
    return (
      <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg-logo">
        <circle cx="22" cy="18" r="8" fill="#F59E0B" />
        <text x="38" y="23" fill="#D97706" fontSize="14" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">SURYA</text>
      </svg>
    );
  }
  if (name.includes('texmo') || name.includes('sharp')) {
    return (
      <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg-logo">
        <text x="70" y="23" fill="#0D9488" fontSize="16" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1.5">TEXMO</text>
      </svg>
    );
  }
  if (name.includes('microtek') || name.includes('livguard')) {
    return (
      <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg-logo">
        <polygon points="12,20 20,8 18,18 26,16 16,30 18,20" fill="#DC2626" />
        <text x="32" y="23" fill="#DC2626" fontSize="14" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.8">MICROTEK</text>
      </svg>
    );
  }
  if (name.includes('doorcarts')) {
    return (
      <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg-logo">
        <rect x="2" y="4" width="136" height="28" rx="6" fill="#0A2E5D" stroke="#D4AF37" strokeWidth="1.2" />
        <circle cx="18" cy="18" r="6" fill="#D4AF37" />
        <path d="M16 18l1.5 1.5 3-3" stroke="#0A2E5D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="74" y="22" fill="#FFFFFF" fontSize="10.5" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.8">DOORCARTS ASSURED</text>
      </svg>
    );
  }

  // Fallback for custom CMS-added brands (e.g. Siemens, Bosch, L&T, etc.)
  const cleanName = brandName || 'Brand';
  const words = cleanName.split(/[\s/]+/).filter(Boolean);
  const initials = words.slice(0, 2).map((w) => w[0]).join('').toUpperCase() || 'D';

  return (
    <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg-logo">
      <rect x="2" y="2" width="136" height="32" rx="6" fill="#F8FAFC" stroke="rgba(10, 46, 93, 0.15)" strokeWidth="1" />
      <rect x="7" y="6" width="24" height="24" rx="5" fill="#0A2E5D" />
      <text x="19" y="22" fill="#D4AF37" fontSize="11" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">{initials}</text>
      <text x="36" y="23" fill="#0A2E5D" fontSize="11.5" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.4">
        {cleanName.length > 13 ? cleanName.substring(0, 12) + '…' : cleanName.toUpperCase()}
      </text>
    </svg>
  );
}

const DEFAULT_BRANDS = [
  // --- TIER 1: LUXURY & ARCHITECTURAL (High-End Enterprise / Villa Segment) ---
  {
    name: 'Legrand',
    tier: 'premium',
    sector: 'Electrical',
    itemsEn: 'Luxury Modular Switches, Home Automation & MCBs',
    itemsMl: 'പ്രീമിയം മോഡുലാർ സ്വിച്ചുകൾ, ഹോം ഓട്ടോമേഷൻ',
    origin: 'Global Luxury',
    color: '#0A2E5D'
  },
  {
    name: 'Schneider Electric',
    tier: 'premium',
    sector: 'Electrical',
    itemsEn: 'Smart Switchgear, Industrial Panels & Building Automation',
    itemsMl: 'സ്മാർട്ട് സ്വിച്ച്ഗിയർ, ഇൻഡസ്ട്രിയൽ പാനലുകൾ',
    origin: 'Global Premium',
    color: '#0A2E5D'
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
    color: '#0A2E5D'
  },
  {
    name: 'Grundfos',
    tier: 'premium',
    sector: 'Pumps',
    itemsEn: 'High-Efficiency Pressure Boosters & Smart Water Pumps',
    itemsMl: 'ഹൈ-എഫിഷ്യൻസി പ്രഷർ ബൂസ്റ്റർ പമ്പുകൾ',
    origin: 'International',
    color: '#0A2E5D'
  },
  {
    name: 'Philips Smart Lighting',
    tier: 'premium',
    sector: 'Lighting',
    itemsEn: 'Architectural LED, Smart WiFi & Chandelier Lighting',
    itemsMl: 'ആർക്കിടെക്ചറൽ & സ്മാർട്ട് LED ലൈറ്റിംഗ്',
    origin: 'Global Leader',
    color: '#0A2E5D'
  },
  {
    name: 'Loom Solar / Enphase',
    tier: 'premium',
    sector: 'Solar',
    itemsEn: 'High-Efficiency Mono PERC Bifacial Panels & Microinverters',
    itemsMl: 'ഹൈ-എഫിഷ്യൻസി സോളാർ പാനലുകൾ & ഇൻവെർട്ടറുകൾ',
    origin: 'Tier-1 Solar',
    color: '#0A2E5D'
  },
  {
    name: 'Yale / Godrej Smart Locks',
    tier: 'premium',
    sector: 'Hardware',
    itemsEn: 'Biometric Digital Door Locks, Video Door Phones & Safes',
    itemsMl: 'ബയോമെട്രിക് ഡിജിറ്റൽ ഡോർ ലോക്കുകൾ, സുരക്ഷാ സിസ്റ്റം',
    origin: 'Smart Security',
    color: '#0A2E5D'
  },

  // --- TIER 2: COMMERCIAL & RESIDENTIAL STANDARD (High-Volume National Brands) ---
  {
    name: 'Havells',
    tier: 'standard',
    sector: 'Electrical',
    itemsEn: 'Flame-Retardant Cables, Modular Switches, Fans & Switchgear',
    itemsMl: 'വയറുകൾ, സ്വിച്ചുകൾ, ഫാനുകൾ, ഇലക്ട്രിക്കൽ ഉപകരണങ്ങൾ',
    origin: 'Trusted National',
    color: '#0A2E5D'
  },
  {
    name: 'Finolex Cables & Pipes',
    tier: 'standard',
    sector: 'Electrical',
    itemsEn: 'House Wiring Cables, Conduit Pipes & UV-Protected Fittings',
    itemsMl: 'ഹൗസ് വയറിംഗ് കേബിളുകൾ, പൈപ്പുകൾ',
    origin: 'India Top Brand',
    color: '#0A2E5D'
  },
  {
    name: 'V-Guard',
    tier: 'standard',
    sector: 'Solar',
    itemsEn: 'Inverters, Stabilizers, Solar Water Heaters & Industrial Pumps',
    itemsMl: 'ഇൻവെർട്ടറുകൾ, സ്റ്റെബിലൈസറുകൾ, സോളാർ വാട്ടർ ഹീറ്റർ',
    origin: 'Kerala Favorite',
    color: '#0A2E5D'
  },
  {
    name: 'Polycab',
    tier: 'standard',
    sector: 'Electrical',
    itemsEn: 'FR/FRLS Wires, Industrial Power Cables & Distribution Switchgear',
    itemsMl: 'വയറുകൾ, ഇൻഡസ്ട്രിയൽ കേബിളുകൾ, സ്വിച്ച്ഗിയർ',
    origin: 'National Leader',
    color: '#0A2E5D'
  },
  {
    name: 'Astral Pipes',
    tier: 'standard',
    sector: 'Plumbing',
    itemsEn: 'CPVC Pro, UPVC, Silencio Low-Noise Drainage Pipes',
    itemsMl: 'CPVC, UPVC പ്ലമ്പിംഗ് പൈപ്പുകളും ഫിറ്റിംഗ്സും',
    origin: 'IS Certified',
    color: '#0A2E5D'
  },
  {
    name: 'Cera Sanitaryware',
    tier: 'standard',
    sector: 'Plumbing',
    itemsEn: 'Wall-Hung Closets, Wash Basins, CP Taps & Vitrified Tiles',
    itemsMl: 'ക്ലോസറ്റുകൾ, വാഷ് ബേസിനുകൾ, CP ടാപ്പുകൾ',
    origin: 'Popular Choice',
    color: '#0A2E5D'
  },
  {
    name: 'Supreme Pipes',
    tier: 'standard',
    sector: 'Plumbing',
    itemsEn: 'Plumbing Systems, Underground Drainage & Commercial Water Tanks',
    itemsMl: 'പ്ലമ്പിംഗ് പൈപ്പുകൾ, വാട്ടർ ടാങ്കുകൾ',
    origin: 'National Standard',
    color: '#0A2E5D'
  },
  {
    name: 'Crompton / Kirloskar',
    tier: 'standard',
    sector: 'Pumps',
    itemsEn: 'Domestic Monoblock, Borewell Submersible Pumps & Industrial Motors',
    itemsMl: 'ഗാർഹിക മോട്ടോറുകൾ, സബ്മേഴ്സിബിൾ പമ്പുകൾ',
    origin: 'Proven Durability',
    color: '#0A2E5D'
  },
  {
    name: 'Luker / Wipro Lighting',
    tier: 'standard',
    sector: 'Lighting',
    itemsEn: 'Commercial LED Downlights, Panel Lights & Industrial Floodlights',
    itemsMl: 'LED ലൈറ്റുകൾ, പാനൽ ലൈറ്റുകൾ, സ്ട്രീറ്റ് ലൈറ്റുകൾ',
    origin: 'Energy Star',
    color: '#0A2E5D'
  },
  {
    name: 'Anchor by Panasonic',
    tier: 'standard',
    sector: 'Electrical',
    itemsEn: 'Roma Modular Switches, Distribution Boards & Accessories',
    itemsMl: 'റോമ സ്വിച്ചുകൾ, ഡിസ്ട്രിബ്യൂഷൻ ബോർഡുകൾ',
    origin: 'Most Popular',
    color: '#0A2E5D'
  },

  // --- TIER 3: SMART ECONOMY & UTILITY (ISI-Certified Value Range) ---
  {
    name: 'GM / GreatWhite Economy',
    tier: 'budget',
    sector: 'Electrical',
    itemsEn: 'Cost-Effective Switches, Sockets, Distribution Enclosures & Holders',
    itemsMl: 'കുറഞ്ഞ നിരക്കിലുള്ള മികച്ച സ്വിച്ചുകളും സോക്കറ്റുകളും',
    origin: 'Value Range',
    color: '#0A2E5D'
  },
  {
    name: 'Kelachandra / Star Pipes',
    tier: 'budget',
    sector: 'Plumbing',
    itemsEn: 'ISI PVC Pipes, Agricultural Fittings & Economy Drainage Systems',
    itemsMl: 'ബജറ്റ് ഫ്രണ്ട്‌ലി ISI PVC പൈപ്പുകളും ഫിറ്റിംഗ്സും',
    origin: 'Kerala Economy',
    color: '#0A2E5D'
  },
  {
    name: 'Parryware / Hindware Essential',
    tier: 'budget',
    sector: 'Plumbing',
    itemsEn: 'Budget-Friendly Sanitaryware, EWC Sets & PVC Cisterns',
    itemsMl: 'മിതമായ നിരക്കിലുള്ള സാനിറ്ററിവെയർ സെറ്റുകൾ',
    origin: 'Smart Budget',
    color: '#0A2E5D'
  },
  {
    name: 'Surya / Halonix LED',
    tier: 'budget',
    sector: 'Lighting',
    itemsEn: 'Affordable LED Bulbs, Batten Tubes & Heavy-Duty Utility Lighting',
    itemsMl: 'കുറഞ്ഞ വിലയിലുള്ള ഈടുനിൽക്കുന്ന LED ബൾബുകൾ',
    origin: 'Economy Saver',
    color: '#0A2E5D'
  },
  {
    name: 'Texmo / Sharp Economy Pumps',
    tier: 'budget',
    sector: 'Pumps',
    itemsEn: 'Compact Domestic Water Pumps & Agricultural Motors',
    itemsMl: 'സാധാരണ വീടുകൾക്കുള്ള ബജറ്റ് വാട്ടർ പമ്പുകൾ',
    origin: 'Value Motor',
    color: '#0A2E5D'
  },
  {
    name: 'Microtek / Livguard Value',
    tier: 'budget',
    sector: 'Solar',
    itemsEn: 'Home UPS Inverters, Tubular Batteries & Basic Solar Kits',
    itemsMl: 'ബജറ്റ് ഹോം ഇൻവെർട്ടറുകളും ബാറ്ററികളും',
    origin: 'Budget Backup',
    color: '#0A2E5D'
  },
  {
    name: 'Doorcarts Assured Selection',
    tier: 'budget',
    sector: 'Hardware',
    itemsEn: 'Factory-Direct Hardware, Fasteners, Tools & Sanitary Essentials',
    itemsMl: 'ഡോർകാർട്ട്സ് നേരിട്ട് നൽകുന്ന ഹാർഡ്‌വെയർ & ടൂൾസ്',
    origin: 'Direct Sourcing',
    color: '#0A2E5D'
  }
];

const SECTORS = [
  { id: 'all', en: 'All Categories', ml: 'എല്ലാ വിഭാഗങ്ങളും' },
  { id: 'Electrical', en: 'Electrical & Switchgear', ml: 'ഇലക്ട്രിക്കൽ & സ്വിച്ച്ഗിയർ' },
  { id: 'Plumbing', en: 'Plumbing & Sanitary', ml: 'പ്ലമ്പിംഗ് & സാനിറ്ററി' },
  { id: 'Solar', en: 'Solar & Energy EPC', ml: 'സോളാർ & എനർജി' },
  { id: 'Lighting', en: 'Lighting & Fixtures', ml: 'ലൈറ്റിംഗ്' },
  { id: 'Pumps', en: 'Pumps & Motors', ml: 'പമ്പുകൾ & മോട്ടോർ' },
  { id: 'Hardware', en: 'Hardware & Security', ml: 'ഹാർഡ്‌വെയർ & സെക്യൂരിറ്റി' }
];

export default function AppBrandExplorer({ lang = 'en', t = {} }) {
  const { themeSettings } = useCMS();
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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
      badgeEn: 'Comprehensive OEM Network',
      badgeMl: 'മുഴുവൻ കാറ്റലോഗ്',
      titleEn: 'All Partner Brands',
      titleMl: 'എല്ലാ ബ്രാൻഡുകളും',
      descEn: 'Direct factory sourcing across international, national, and value-engineered manufacturers.',
      descMl: 'ഇന്റർനാഷണൽ, നാഷണൽ, ബജറ്റ് ലെവലുകളിലുള്ള മുഴുവൻ കമ്പനികളുടെയും ഒഫീഷ്യൽ സപ്ലൈ.'
    },
    {
      id: 'premium',
      icon: Crown,
      badgeEn: 'Tier-1 Luxury & Architectural',
      badgeMl: 'ലക്ഷ്വറി ആർക്കിടെക്ചറൽ',
      titleEn: 'Luxury & Architectural',
      titleMl: 'പ്രീമിയം & ലക്ഷ്വറി',
      descEn: 'Global architectural and automation brands specified for premier villas, commercial high-rises, and hospitality projects.',
      descMl: 'വില്ലകൾക്കും വലിയ കൊമേഴ്സ്യൽ പ്രോജക്ടുകൾക്കും അനുയോജ്യമായ ആഗോള ആർക്കിടെക്ചറൽ ബ്രാൻഡുകൾ.'
    },
    {
      id: 'standard',
      icon: Star,
      badgeEn: 'National Commercial Standard',
      badgeMl: 'കൊമേഴ്സ്യൽ സ്റ്റാൻഡേർഡ്',
      titleEn: 'Commercial & Residential',
      titleMl: 'കൊമേഴ്സ്യൽ & സ്റ്റാൻഡേർഡ്',
      descEn: 'India’s most trusted, high-durability brands engineered for residential communities, corporate offices, and institutions.',
      descMl: 'വീടുകൾക്കും സ്ഥാപനങ്ങൾക്കും ഏറ്റവും വിശ്വസനീയമായ ദേശീയ നിലവാരമുള്ള ബ്രാൻഡുകൾ.'
    },
    {
      id: 'budget',
      icon: Wallet,
      badgeEn: 'Certified Utility & Value',
      badgeMl: 'സ്മാർട്ട് ഇക്കണോമി',
      titleEn: 'Smart Economy & Value',
      titleMl: 'സ്മാർട്ട് ഇക്കണോമി & വാല്യൂ',
      descEn: 'ISI-certified, cost-optimized engineering essentials delivering verified safety and endurance for smart construction budgets.',
      descMl: 'ചിലവ് ചുരുക്കി മികച്ച ഗുണമേന്മ ഉറപ്പാക്കുന്ന ISI സർട്ടിഫൈഡ് ബജറ്റ് ബ്രാൻഡുകൾ.'
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
        label: lang === 'en' ? 'Luxury' : 'ലക്ഷ്വറി',
        className: 'abe-tier-luxury',
        Icon: Crown
      };
    }
    if (tierId === 'standard') {
      return {
        label: lang === 'en' ? 'Standard' : 'സ്റ്റാൻഡേർഡ്',
        className: 'abe-tier-standard',
        Icon: Star
      };
    }
    return {
      label: lang === 'en' ? 'Value' : 'വാല്യൂ',
      className: 'abe-tier-budget',
      Icon: Wallet
    };
  };

  const activeTierObj = tiers.find((tr) => tr.id === selectedTier) || tiers[0];

  const renderStoreButtons = (extraClass = '') => (
    <div className={`abe-store-buttons ${extraClass}`}>
      <a
        href={playStoreUrl && playStoreUrl !== '#' ? playStoreUrl : '/contact?subject=Product&topic=Doorcarts%20Android%20App%20Access'}
        target={playStoreUrl && playStoreUrl !== '#' ? '_blank' : undefined}
        rel={playStoreUrl && playStoreUrl !== '#' ? 'noopener noreferrer' : undefined}
        className="abe-store-btn"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
          <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
        </svg>
        <div className="abe-store-btn-text">
          <small>{lang === 'en' ? 'GET IT ON' : 'ഡൗൺലോഡ് ചെയ്യാം'}</small>
          <strong>Google Play</strong>
        </div>
      </a>

      <a
        href={appStoreUrl && appStoreUrl !== '#' ? appStoreUrl : '/contact?subject=Product&topic=Doorcarts%20iOS%20App%20Access'}
        target={appStoreUrl && appStoreUrl !== '#' ? '_blank' : undefined}
        rel={appStoreUrl && appStoreUrl !== '#' ? 'noopener noreferrer' : undefined}
        className="abe-store-btn"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.33c.64-.78 1.08-1.86.96-2.94-.93.04-2.06.62-2.72 1.4-.58.68-1.1 1.79-.96 2.84 1.04.08 2.08-.52 2.72-1.3z" />
        </svg>
        <div className="abe-store-btn-text">
          <small>{lang === 'en' ? 'DOWNLOAD ON' : 'ഡൗൺലോഡ് ചെയ്യാം'}</small>
          <strong>App Store</strong>
        </div>
      </a>
    </div>
  );

  return (
    <section id="app-brands" className="section app-brands-sec">
      <div className="container">
        {/* Executive Section Header */}
        <div className="section-header">
          <span className="section-label">
            {cmsAppBrands.label || (lang === 'en' ? 'OEM SOURCING & BRAND PARTNERS' : 'ഓഥറൈസ്ഡ് ബ്രാൻഡ് പാർട്ണർഷിപ്പുകൾ & ഡിസ്ട്രിബ്യൂഷൻ')}
          </span>
          <h2 className="section-title">
            {cmsAppBrands.title || (lang === 'en'
              ? 'Authorised Brand Partners & Multi-Tier Supply Ecosystem'
              : 'ആഗോള ബ്രാൻഡുകൾ, മികച്ച ക്വാളിറ്റി, നേരിട്ടുള്ള കമ്പനി വിതരണം')}
          </h2>
          <p className="section-subtitle">
            {cmsAppBrands.subtitle || (lang === 'en'
              ? 'Through Doorcarts enterprise network, Dorek International connects residential developments, infrastructure projects, and commercial builders directly with certified global and national manufacturers.'
              : 'ഡോർകാർട്ട്സ് വിതരണ ശൃംഖലയിലൂടെ ഇന്ത്യയിലെയും ലോകത്തെയും മുൻനിര ബ്രാൻഡുകളുടെ ഉൽപ്പന്നങ്ങൾ ബിസിനസ്സ് ആവശ്യങ്ങൾക്കും വീടുകൾക്കും കമ്പനി വാറന്റിയോടെ ലഭ്യമാക്കുന്നു.')}
          </p>
        </div>

        {/* Brand Ecosystem Container */}
        <div className="abe-corporate-container">
          {/* Top Control Center: Tier Tabs & Filters */}
          <div className="abe-control-deck">
            {/* 4 Segment Tabs */}
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
                    className={`abe-tier-tab ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedTier(tr.id);
                    }}
                  >
                    <div className="abe-tier-tab-icon">
                      <Icon size={16} />
                    </div>
                    <div className="abe-tier-tab-text">
                      <span className="abe-tier-tab-title">{lang === 'en' ? tr.titleEn : tr.titleMl}</span>
                      <small className="abe-tier-tab-badge">{lang === 'en' ? tr.badgeEn : tr.badgeMl}</small>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Sub-Control: Category Filters & Sleek Search */}
            <div className="abe-sub-controls">
              {/* Sector Category Pills */}
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

              {/* Minimalist Corporate Search Bar */}
              <div className="abe-search-wrapper">
                <Search size={16} className="abe-search-icon" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    lang === 'en'
                      ? 'Search partner brand or item...'
                      : 'ബ്രാൻഡോ ഉൽപ്പന്നമോ തിരയുക...'
                  }
                  className="abe-search-input"
                  aria-label="Search partner brand"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="abe-search-clear"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Active Context Banner */}
            <div className="abe-context-bar">
              <div className="abe-context-left">
                <ShieldCheck size={16} className="abe-context-icon" />
                <span className="abe-context-text">
                  {searchQuery
                    ? (lang === 'en'
                        ? `Displaying verified partners matching "${searchQuery}"`
                        : `"${searchQuery}" തിരയലിലെ അംഗീകൃത ബ്രാൻഡുകൾ`)
                    : (lang === 'en' ? activeTierObj.descEn : activeTierObj.descMl)}
                </span>
              </div>
              <div className="abe-context-count">
                <span>{filteredBrands.length}</span>
                <small>{lang === 'en' ? 'Verified Partners' : 'അംഗീകൃത കമ്പനികൾ'}</small>
              </div>
            </div>
          </div>

          {/* Corporate Brand Partner Grid */}
          {filteredBrands.length > 0 ? (
            <div className="abe-brands-grid">
              {filteredBrands.map((brand, idx) => {
                const tierMeta = getTierMeta(brand.tier);
                const TierIcon = tierMeta.Icon;

                return (
                  <div key={`${brand.name}-${idx}`} className="abe-brand-card">
                    {/* Card Head with Logo & Tier Badge */}
                    <div className="abe-card-head">
                      <div className="abe-brand-logo-frame">
                        {brand.logo ? (
                          <img
                            src={convertDriveUrl(brand.logo)}
                            alt={brand.name}
                            className="abe-custom-logo"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const fallbackEl = e.currentTarget.nextElementSibling;
                              if (fallbackEl) fallbackEl.style.display = 'block';
                            }}
                          />
                        ) : null}
                        <div style={{ display: brand.logo ? 'none' : 'block', width: '100%', height: '100%' }}>
                          <BrandLogo brandName={brand.name} />
                        </div>
                      </div>
                      <span className={`abe-tier-tag ${tierMeta.className}`}>
                        <TierIcon size={11} />
                        {tierMeta.label}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="abe-card-body">
                      <div className="abe-card-meta-line">
                        <span className="abe-brand-sector">{brand.sector}</span>
                        <span className="abe-origin-tag">{brand.origin}</span>
                      </div>
                      <h4 className="abe-brand-name">{brand.name}</h4>
                      <p className="abe-brand-items">
                        {lang === 'en' ? brand.itemsEn : (brand.itemsMl || brand.itemsEn)}
                      </p>
                    </div>

                    {/* Card Footer: Enterprise Channel Status */}
                    <div className="abe-card-footer">
                      <div className="abe-status-wrap">
                        <span className="abe-status-pulse" />
                        <span className="abe-status-text">
                          {lang === 'en' ? 'Authorised Channel' : 'അംഗീകൃത വിതരണം'}
                        </span>
                      </div>
                      <span className="abe-scope-tag">
                        {lang === 'en' ? 'B2B & Retail' : 'B2B & റീട്ടെയ്ൽ'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Refined Corporate Fallback */
            <div className="abe-empty-fallback">
              <BadgeCheck size={36} className="abe-empty-icon" />
              <h4>
                {lang === 'en'
                  ? `Direct Procurement Available for "${searchQuery}"`
                  : `"${searchQuery}" നേരിട്ടുള്ള വിതരണത്തിന് ലഭ്യമാണ്`}
              </h4>
              <p>
                {lang === 'en'
                  ? 'Through the Dorek International OEM network, we supply 100+ additional industrial and architectural partner brands on direct contract. Get in touch with our procurement team for instant stock allocation & project quotes.'
                  : 'ഇവിടെ കാണുന്നതിന് പുറമെ നൂറിലധികം മറ്റ് ആഗോള ബ്രാൻഡുകളും ഞങ്ങളുടെ നെറ്റ്‌വർക്ക് വഴി നേരിട്ട് ലഭ്യമാണ്. വിലയും സ്റ്റോക്ക് ലഭ്യതയും അറിയാൻ ബന്ധപ്പെടുക.'}
              </p>
              <Link
                href={`/contact?subject=Product&topic=${encodeURIComponent(`OEM Brand Allocation: ${searchQuery}`)}`}
                className="btn btn-primary btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
              >
                <span>{lang === 'en' ? `Inquire for "${searchQuery}" Supply` : `"${searchQuery}" ലഭ്യത ചോദിക്കാം`}</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          )}

          {/* Seamless Dorek Group Procurement & Mobile App Banner */}
          <div className="abe-enterprise-banner">
            <div className="abe-eb-left">
              <div className="abe-eb-pill-row">
                <span className="abe-eb-group-pill">
                  <Building2 size={13} />
                  {lang === 'en' ? 'DOREK GROUP PROCUREMENT PLATFORM' : 'ഡോറെക് ഗ്രൂപ്പ് പ്രൊക്യൂർമെന്റ് പ്ലാറ്റ്‌ഫോം'}
                </span>
                <span className="abe-eb-subpill">
                  {cmsAppBrands.appName || (lang === 'en' ? 'Doorcarts Enterprise & Mobile' : 'ഡോർകാർട്ട്സ് മൊബൈൽ ആപ്പ് & പോർട്ടൽ')}
                </span>
              </div>

              <h3 className="abe-eb-title">
                {lang === 'en'
                  ? 'Unified Supply Chain: Direct Factory Rates, Live App & Project Logistics'
                  : 'ഡിജിറ്റൽ സപ്ലൈ ചെയിൻ: ഫാക്ടറി നിരക്കുകൾ, ലൈവ് ആപ്പ് & അതിവേഗ വിതരണം'}
              </h3>

              <p className="abe-eb-desc">
                {cmsAppBrands.appDesc || (lang === 'en'
                  ? 'Through Doorcarts, Dorek International equips builders, contractors, engineers, and property owners with direct access to 10,000+ certified products across Electrical, Plumbing, Solar EPC, Lighting, and Sanitaryware with district-level warehousing across all 14 Kerala districts.'
                  : 'ഇലക്ട്രിക്കൽ, പ്ലമ്പിംഗ്, സോളാർ, ലൈറ്റിംഗ്, സാനിറ്ററി മേഖലകളിലെ 10,000-ലധികം ഉൽപ്പന്നങ്ങൾ കമ്പനി വാറന്റിയോടെയും ട്രാൻസ്പരന്റ് റേറ്റുകളോടെയും കേരളത്തിലെ 14 ജില്ലകളിലും ലഭ്യമാണ്.')}
              </p>

              <div className="abe-eb-perks-grid">
                <div className="abe-eb-perk">
                  <CheckCircle2 size={15} className="abe-perk-icon" />
                  <span>{lang === 'en' ? 'Direct OEM Sourcing & GST Bills' : 'കമ്പനി ഇൻവോയിസും GST ക്രെഡിറ്റും'}</span>
                </div>
                <div className="abe-eb-perk">
                  <CheckCircle2 size={15} className="abe-perk-icon" />
                  <span>{lang === 'en' ? '14-District Rapid Logistics Network' : '14 ജില്ലകളിലും അതിവേഗ വിതരണം'}</span>
                </div>
                <div className="abe-eb-perk">
                  <CheckCircle2 size={15} className="abe-perk-icon" />
                  <span>{lang === 'en' ? '100% Genuine Manufacturer Warranty' : '100% കമ്പനി വാറന്റി ഉറപ്പ്'}</span>
                </div>
                <div className="abe-eb-perk">
                  <CheckCircle2 size={15} className="abe-perk-icon" />
                  <span>{lang === 'en' ? 'Bulk Project Credit & Quotations' : 'പ്രോജക്ട് ബൾക്ക് ക്രെഡിറ്റ് & കൊട്ടേഷൻ'}</span>
                </div>
              </div>
            </div>

            <div className="abe-eb-right">
              <div className="abe-eb-download-card">
                <div className="abe-eb-card-label">
                  <Smartphone size={16} />
                  <span>{lang === 'en' ? 'Order On Doorcarts App' : 'ഡോർകാർട്ട്സ് ആപ്പിൽ ഓർഡർ ചെയ്യാം'}</span>
                </div>
                {renderStoreButtons('abe-eb-stores')}
              </div>

              <Link
                href={`/contact?subject=Product&topic=${encodeURIComponent(`B2B Corporate Brand Supply Quote (${activeTierObj.titleEn})`)}`}
                className="abe-eb-quote-btn"
              >
                <span>{lang === 'en' ? 'Request B2B Corporate Project Quote' : 'പ്രോജക്ട് കൊട്ടേഷനായി ബന്ധപ്പെടാം'}</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
