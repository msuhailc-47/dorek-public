"use client";
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { ShoppingCart, Store, Network, Truck, Wrench, Settings, GraduationCap, Code, X, ArrowRight } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import './Businesses.css';
import useScrollReveal from '../utils/useScrollReveal';

const icons = [ShoppingCart, Store, Network, Truck, Wrench, Settings, GraduationCap, Code];
const gradients = [
  'linear-gradient(135deg, #00b4d8, #0077b6)', 'linear-gradient(135deg, #10b981, #059669)',
  'linear-gradient(135deg, #8b5cf6, #6d28d9)', 'linear-gradient(135deg, #f59e0b, #d97706)',
  'linear-gradient(135deg, #ef4444, #dc2626)', 'linear-gradient(135deg, #06b6d4, #0891b2)',
  'linear-gradient(135deg, #d4a843, #b8860b)', 'linear-gradient(135deg, #3b82f6, #2563eb)'
];

const defaultDivisionDetails = {
  en: [
    'Doorcarts serves as the flagship multi-category retail and wholesale brand under Dorek International, offering certified electrical, plumbing, sanitaryware, solar energy, water purification, and smart building automation solutions.',
    'Doorcarts My Store empowers local entrepreneurs to launch turnkey, branded retail outlets backed by centralized procurement, digital inventory systems, marketing support, and territory protection.',
    'Our Retail Network spans across all 14 districts of Kerala, connecting regional hubs and local outlets to ensure genuine engineering products and rapid last-mile delivery.',
    'The Distribution Division manages direct manufacturer tie-ups, bulk warehousing, and B2B supply chains for dealers, contractors, and commercial infrastructure projects.',
    'Our Service Division deploys certified engineers and technicians for turnkey solar EPC installations, industrial electrical contracting, water treatment plants, and smart automation setups.',
    'The Maintenance Division provides comprehensive Annual Maintenance Contracts (AMC), preventive inspections, and priority breakdown support for residential, commercial, and industrial installations.',
    'The Training Division conducts hands-on technical certification programs in solar EPC, electrical safety, and retail store management for technicians, associates, and youth.',
    'Our in-house Software Division builds and maintains Dorek Pulse, cloud ERP, GST billing, inventory tracking, CRM, and mobile applications tailored for multi-branch enterprise operations.'
  ],
  ml: [
    'ഇലക്ട്രിക്കൽ, പ്ലംബിംഗ്, സാനിറ്ററി, സോളാർ എനർജി, വാട്ടർ പ്യൂരിഫിക്കേഷൻ, സ്മാർട്ട് ഓട്ടോമേഷൻ ഉൽപ്പന്നങ്ങൾ ഒരു കുടക്കീഴിൽ ലഭ്യമാക്കുന്ന ഡോറെക് ഇന്റർനാഷണലിന്റെ പ്രധാന ബ്രാൻഡാണ് ഡോർകാർട്ട്സ്.',
    'കേന്ദ്രീകൃത പർച്ചേസിംഗ്, ഡിജിറ്റൽ ഇൻവെന്ററി സോഫ്റ്റ്‌വെയർ, മാർക്കറ്റിംഗ് സപ്പോർട്ട് എന്നിവയോടെ സ്വന്തമായി ബ്രാൻഡഡ് റീട്ടെയ്ൽ സ്റ്റോറുകൾ തുടങ്ങാൻ സംരംഭകരെ സഹായിക്കുന്ന ഫ്രാഞ്ചൈസി മോഡലാണ് ഡോർകാർട്ട്സ് മൈ സ്റ്റോർ.',
    'കേരളത്തിലെ 14 ജില്ലകളിലുമുള്ള ഹബുകളെയും ഔട്ട്‌ലെറ്റുകളെയും ബന്ധിപ്പിച്ച് ഗുണനിലവാരമുള്ള ഉൽപ്പന്നങ്ങൾ വേഗത്തിൽ ഉപഭോക്താക്കളിലേക്ക് എത്തിക്കുന്ന റീട്ടെയ്ൽ ശൃംഖല.',
    'ഡീലർമാർക്കും പ്രോജക്ട് കോൺട്രാക്ടർമാർക്കും നേരിട്ട് മികച്ച ബ്രാൻഡുകളുടെ ഉൽപ്പന്നങ്ങൾ ഹോൾസെയിലായി വിതരണം ചെയ്യുന്ന ഡിസ്ട്രിബ്യൂഷൻ വിഭാഗം.',
    'സോളാർ പവർ പ്ലാന്റുകൾ, വാട്ടർ ട്രീറ്റ്‌മെന്റ് പ്ലാന്റുകൾ, ഇലക്ട്രിക്കൽ-പ്ലംബിംഗ് പ്രോജക്ടുകൾ എന്നിവ വിദഗ്ദ്ധ എഞ്ചിനീയർമാരുടെ മേൽനോട്ടത്തിൽ ഇൻസ്റ്റാൾ ചെയ്ത് നൽകുന്ന സർവീസ് ഡിവിഷൻ.',
    'വീടുകൾക്കും സ്ഥാപനങ്ങൾക്കും വ്യവസായശാലകൾക്കും കൃത്യസമയത്തുള്ള സർവീസും വാർഷിക പരിപാലന കരാറുകളും (AMC) ഉറപ്പാക്കുന്ന മെയിന്റനൻസ് വിഭാഗം.',
    'സോളാർ എഞ്ചിനീയറിംഗ്, ഇലക്ട്രിക്കൽ ഇൻസ്റ്റലേഷൻ, റീട്ടെയ്ൽ മാനേജ്‌മെന്റ് എന്നിവയിൽ പ്രായോഗിക പരിശീലനവും സർട്ടിഫിക്കേഷനും നൽകുന്ന ട്രെയിനിംഗ് വിഭാഗം.',
    'ഇആർപി (ERP), സിആർഎം (CRM), ജിഎസ്ടി ബില്ലിംഗ്, ഇൻവെന്ററി മാനേജ്‌മെന്റ്, മൊബൈൽ ആപ്പുകൾ എന്നിവ വികസിപ്പിക്കുന്ന ഇൻ-ഹൗസ് സോഫ്റ്റ്‌വെയർ വിഭാഗം.'
  ]
};

export default function Businesses({ lang, t }) {
  const { ref: scrollRef, className: scrollClass } = useScrollReveal();
  const [activePopup, setActivePopup] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activePopup !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activePopup]);

  const getPopupDetails = (idx) => {
    const item = t.businesses.items[idx];
    if (item?.details && item.details.trim() && !item.details.includes('Admin Panel')) {
      return item.details;
    }
    const langDetails = defaultDivisionDetails[lang] || defaultDivisionDetails.en;
    return langDetails[idx] || defaultDivisionDetails.en[0];
  };

  return (
    <section id="businesses" className={`section businesses ${scrollClass}`} ref={scrollRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.businesses.label}</span>
          <h2 className="section-title">{t.businesses.title}</h2>
          <p className="section-subtitle">{t.businesses.subtitle}</p>
        </div>
        <div className="biz-grid">
          {t.businesses.items.map((item, i) => {
            const Icon = icons[i] || ShoppingCart;
            return (
              <div key={i} className="biz-card">
                <div className="biz-card-icon" style={{ background: gradients[i % gradients.length] }}>
                  <Icon size={28} color="white" />
                </div>
                <span className="badge">{item.tag}</span>
                <h3 className="biz-card-name">{item.name}</h3>
                <p className="biz-card-desc">{item.desc}</p>
                <button className="biz-learn-more" onClick={() => setActivePopup(i)}>
                  {t.businesses.learnMore} →
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Learn More Popup Modal mounted to document.body via Portal */}
      {mounted && activePopup !== null && t.businesses.items[activePopup] && typeof document !== 'undefined' && (
        createPortal(
          <div className="biz-popup-overlay" onClick={() => setActivePopup(null)}>
            <div className="biz-popup-modal" onClick={(e) => e.stopPropagation()}>
              <button className="biz-popup-close" onClick={() => setActivePopup(null)} aria-label="Close Details Modal">
                <X size={22} />
              </button>
              <div className="biz-popup-header">
                <div className="biz-popup-icon" style={{ background: gradients[activePopup % gradients.length] }}>
                  {(() => { const Icon = icons[activePopup] || ShoppingCart; return <Icon size={32} color="white" />; })()}
                </div>
                <div>
                  <span className="badge">{t.businesses.items[activePopup].tag}</span>
                  <h3 className="biz-popup-title">{t.businesses.items[activePopup].name}</h3>
                </div>
              </div>
              <div className="biz-popup-body">
                <p className="biz-popup-desc">{t.businesses.items[activePopup].desc}</p>
                <div className="biz-popup-details">
                  {getPopupDetails(activePopup)}
                </div>
                <div style={{ marginTop: '22px', display: 'flex', justifyContent: 'flex-end' }}>
                  <Link
                    href="/contact"
                    className="btn btn-primary btn-sm"
                    style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    onClick={() => setActivePopup(null)}
                  >
                    <span>{lang === 'en' ? 'Enquire About This Division' : 'ഈ ഡിവിഷനുമായി ബന്ധപ്പെടുക'}</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      )}
    </section>
  );
}

