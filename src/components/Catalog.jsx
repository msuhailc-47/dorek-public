"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  MessageCircle, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  ArrowRight, 
  Zap, 
  Truck, 
  PhoneCall,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { getOptimizedUrl, convertDriveUrl } from '../utils/getOptimizedUrl';
import translations from '../i18n/translations';
import './Catalog.css';

export default function Catalog({ lang, t }) {
  const catalogData = (t?.catalog && t.catalog.categories && t.catalog.categories.length > 0)
    ? t.catalog
    : (translations[lang]?.catalog || translations.en?.catalog || {});

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = catalogData.categories || [];
  const allProducts = catalogData.products || [];
  const whatsappNumber = (catalogData.whatsappNumber || t?.contact?.whatsapp || '+91 8606999350').replace(/[^+\d]/g, '');

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory;
      if (!matchCat) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchName = (p.name || '').toLowerCase().includes(q);
      const matchCode = (p.code || '').toLowerCase().includes(q);
      const matchDesc = (p.description || '').toLowerCase().includes(q);
      const matchSpecs = (p.specs || []).some(s => s.toLowerCase().includes(q));
      const matchBadge = (p.badge || '').toLowerCase().includes(q);

      return matchName || matchCode || matchDesc || matchSpecs || matchBadge;
    });
  }, [allProducts, activeCategory, searchQuery]);

  // Handle WhatsApp Enquiry click with analytics tracking (Meta Pixel & GA4)
  const handleWhatsAppEnquiry = (product) => {
    const rawMessage = product.whatsappMessage || 
      (lang === 'en' 
        ? `Hi Doorcarts, I am interested in '${product.name}' (Model: ${product.code || 'N/A'}) from your catalog. Please share wholesale and retail pricing.` 
        : `ഹലോ ഡോർകാർട്സ്, നിങ്ങളുടെ കാറ്റലോഗിലെ '${product.name}' (മോഡൽ: ${product.code || 'N/A'})-നെക്കുറിച്ചുള്ള കൂടുതൽ വിവരങ്ങളും വിലയും അറിയാൻ താല്പര്യമുണ്ട്.`);

    const encodedMsg = encodeURIComponent(rawMessage);
    const cleanPhone = whatsappNumber.replace('+', '');
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

    // Trigger Meta Pixel custom conversion if available
    try {
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('trackCustom', 'WhatsApp_Enquiry', {
          content_name: product.name,
          content_category: product.category,
          model_code: product.code || '',
          value: 1.0,
          currency: 'INR'
        });
      }
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'whatsapp_enquiry', {
          item_name: product.name,
          item_category: product.category,
          model_code: product.code || ''
        });
      }
    } catch (e) {
      // Graceful fallback
    }

    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  // Handle Brochure Download or WhatsApp Request
  const handleBrochureClick = () => {
    if (catalogData.brochureUrl && catalogData.brochureUrl.trim() !== '') {
      window.open(catalogData.brochureUrl, '_blank', 'noopener,noreferrer');
    } else {
      const msg = encodeURIComponent(
        lang === 'en'
          ? "Hi Doorcarts, please share the complete PDF Product Catalog and latest trade price list."
          : "ഹലോ ഡോർകാർട്സ്, നിങ്ങളുടെ മുഴുവൻ PDF പ്രൊഡക്റ്റ് കാറ്റലോഗും ട്രേഡ് പ്രൈസ് ലിസ്റ്റും അയച്ചു തരാമോ."
      );
      window.open(`https://wa.me/${whatsappNumber.replace('+', '')}?text=${msg}`, '_blank', 'noopener,noreferrer');
    }
  };

  const getCategoryName = (catId) => {
    const c = categories.find(item => item.id === catId);
    return c ? c.name : catId;
  };

  return (
    <div className="catalog-page">
      <div className="container">

        {/* Breadcrumb Navigation */}
        <div className="catalog-breadcrumb-wrap">
          <nav className="catalog-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">{lang === 'en' ? 'Home' : 'ഹോം'}</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{lang === 'en' ? 'Doorcarts Catalog' : 'ഡോർകാർട്സ് കാറ്റലോഗ്'}</span>
          </nav>
        </div>

        {/* Hero Section */}
        <div className="catalog-hero animate-fadeIn">
          <div className="catalog-badge-pill">
            <Sparkles size={14} className="badge-sparkle-icon" />
            <span>{catalogData.badge || 'DOORCARTS PRODUCT CATALOG • DIRECT WAREHOUSE SUPPLY'}</span>
          </div>

          <h1 className="catalog-title">
            {catalogData.title || (lang === 'en' ? 'Explore Our Building & Living Collections' : 'ഞങ്ങളുടെ പ്രീമിയം ഉൽപ്പന്ന ശേഖരം')}
          </h1>

          <p className="catalog-subtitle">
            {catalogData.subtitle || (lang === 'en'
              ? 'Browse premium electrical, luxury chandeliers, designer bathware, and heavy-duty plumbing supplies direct from Doorcarts regional warehouses with instant WhatsApp wholesale quotes.'
              : 'പ്രീമിയം ഇലക്ട്രിക്കൽ സ്വിച്ചുകൾ, അത്യാകർഷകമായ ഷാൻഡിലിയേഴ്സ്, സാനിറ്ററിവെയർ, പ്ലംബിംഗ് സാമഗ്രികൾ നേരിട്ട് കണ്ട് വാട്സാപ്പിൽ ബന്ധപ്പെടൂ.')}
          </p>

          {/* Quick Value Highlights */}
          <div className="catalog-trust-strip">
            <div className="catalog-trust-item">
              <ShieldCheck size={16} color="#d4af37" />
              <span>{lang === 'en' ? '100% Genuine & Certified' : '100% ഒറിജിനൽ ഉൽപ്പന്നങ്ങൾ'}</span>
            </div>
            <div className="catalog-trust-item">
              <Zap size={16} color="#d4af37" />
              <span>{lang === 'en' ? 'Wholesale & Retail Trade Rates' : 'ഹോൾസെയിൽ & റീട്ടെയിൽ നിരക്കുകൾ'}</span>
            </div>
            <div className="catalog-trust-item">
              <Truck size={16} color="#d4af37" />
              <span>{lang === 'en' ? 'Direct Godown Dispatches' : 'നേരിട്ടുള്ള ഗോഡൗൺ സപ്ലൈ'}</span>
            </div>
            <div className="catalog-trust-item">
              <PhoneCall size={16} color="#d4af37" />
              <span>{lang === 'en' ? 'Instant WhatsApp Support' : 'തൽക്ഷണ വാട്സാപ്പ് സപ്പോർട്ട്'}</span>
            </div>
          </div>

          {/* Brochure Action Button */}
          <div className="catalog-hero-actions">
            <button 
              type="button" 
              onClick={handleBrochureClick} 
              className="catalog-brochure-btn"
              title="Download Complete Catalog PDF"
            >
              <Download size={17} />
              <span>{catalogData.downloadBrochureBtn || (lang === 'en' ? 'Download Full PDF Catalog' : 'മുഴുവൻ PDF കാറ്റലോഗ് ഡൗൺലോഡ്')}</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs & Search Bar Strip */}
        <div className="catalog-controls-strip">
          {/* Category Tabs */}
          <div className="catalog-category-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'all'}
              className={`cat-tab-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              <Layers size={15} />
              <span>{catalogData.allCategories || (lang === 'en' ? 'All Collections' : 'എല്ലാം')}</span>
              <span className="cat-count-badge">{allProducts.length}</span>
            </button>

            {categories.map((cat) => {
              const count = allProducts.filter(p => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  className={`cat-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span>{cat.name}</span>
                  <span className="cat-count-badge">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="catalog-search-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="catalog-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={catalogData.searchPlaceholder || (lang === 'en' ? 'Search products, models, or specs...' : 'ഉൽപ്പന്നങ്ങൾ, മോഡലുകൾ തിരയുക...')}
            />
            {searchQuery && (
              <button 
                type="button" 
                className="search-clear-btn" 
                onClick={() => setSearchQuery('')}
                aria-label="Clear Search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="catalog-results-bar">
          <div className="results-count-text">
            <span>
              {lang === 'en'
                ? `Showing ${filteredProducts.length} of ${allProducts.length} items`
                : `${allProducts.length}-ൽ ${filteredProducts.length} ഉൽപ്പന്നങ്ങൾ കാണിക്കുന്നു`}
            </span>
            {activeCategory !== 'all' && (
              <span className="active-cat-label"> • {getCategoryName(activeCategory)}</span>
            )}
          </div>
          {searchQuery && (
            <button 
              type="button" 
              className="reset-filter-link"
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
            >
              {lang === 'en' ? 'Clear all filters' : 'ഫിൽട്ടറുകൾ നീക്കുക'}
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="catalog-grid">
            {filteredProducts.map((product) => {
              const optimizedImg = getOptimizedUrl(product.image);
              const directDriveImg = convertDriveUrl(product.image);

              return (
                <div key={product.id || product.code} className="catalog-card animate-fadeIn">
                  
                  {/* Card Media Wrapper */}
                  <div className="catalog-card-image-wrap">
                    {product.image ? (
                      <img
                        src={optimizedImg}
                        alt={product.name}
                        className="catalog-card-img"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          if (directDriveImg && e.target.src !== directDriveImg) {
                            e.target.src = directDriveImg;
                          }
                        }}
                      />
                    ) : (
                      <div className="catalog-card-img-placeholder">
                        <Layers size={36} color="#94a3b8" />
                        <span>DOORCARTS</span>
                      </div>
                    )}

                    {/* Badge Pill */}
                    {product.badge && (
                      <span className="catalog-card-badge">
                        {product.badge}
                      </span>
                    )}

                    {/* Model Code Chip */}
                    {product.code && (
                      <span className="catalog-card-code">
                        {product.code}
                      </span>
                    )}
                  </div>

                  {/* Card Content Body */}
                  <div className="catalog-card-body">
                    <span className="catalog-card-category-label">
                      {getCategoryName(product.category)}
                    </span>

                    <h3 className="catalog-card-title">
                      {product.name}
                    </h3>

                    <p className="catalog-card-desc">
                      {product.description}
                    </p>

                    {/* Specs / Feature Tags */}
                    {product.specs && product.specs.length > 0 && (
                      <div className="catalog-card-specs">
                        {product.specs.slice(0, 4).map((spec, sIdx) => (
                          <span key={sIdx} className="spec-tag">
                            <CheckCircle2 size={11} className="spec-check-icon" />
                            {spec}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Footer / WhatsApp CTA */}
                    <div className="catalog-card-footer">
                      <button
                        type="button"
                        onClick={() => handleWhatsAppEnquiry(product)}
                        className="catalog-whatsapp-btn"
                        title="Enquire on WhatsApp"
                      >
                        <MessageCircle size={17} className="wa-icon" />
                        <span>{catalogData.enquireBtn || (lang === 'en' ? 'Enquire on WhatsApp' : 'വാട്സാപ്പിൽ ചോദിക്കാം')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="catalog-empty-state">
            <SlidersHorizontal size={40} color="#94a3b8" />
            <h3>{lang === 'en' ? 'No products match your criteria' : 'ഉൽപ്പന്നങ്ങൾ കണ്ടെത്തിയില്ല'}</h3>
            <p>
              {lang === 'en'
                ? 'Try adjusting your search terms or switch categories to view more items.'
                : 'മറ്റൊരു വാക്ക് തിരയുകയോ അല്ലെങ്കിൽ മറ്റ് കാറ്റഗറികൾ തിരഞ്ഞെടുക്കുകയോ ചെയ്യുക.'}
            </p>
            <button
              type="button"
              className="catalog-empty-reset-btn"
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
            >
              {lang === 'en' ? 'Show All Products' : 'എല്ലാ ഉൽപ്പന്നങ്ങളും കാണുക'}
            </button>
          </div>
        )}

        {/* Project Supply & Bulk Trade Godown Banner */}
        <div className="catalog-bulk-banner">
          <div className="bulk-banner-content">
            <span className="bulk-tag">{lang === 'en' ? 'BULK CONTRACTS & CONTRACTORS' : 'കോൺട്രാക്ടർമാർക്കും പ്രോജക്റ്റുകൾക്കും'}</span>
            <h2>
              {lang === 'en' 
                ? 'Need Full-House Wiring, Sanitary & Plumbing Packages?' 
                : 'മുഴുവൻ വീടിന്റെയും ഇലക്ട്രിക്കൽ, സാനിറ്ററി, പ്ലംബിംഗ് പാക്കേജുകൾ വേണമെന്നുണ്ടോ?'}
            </h2>
            <p>
              {lang === 'en'
                ? 'Doorcarts supplies complete turnkey material kits for villas, apartments, commercial showrooms, and hospitals at direct distributor godown pricing across all 14 districts.'
                : 'കേരളത്തിലെമ്പാടും വില്ലകൾ, അപ്പാർട്ട്മെന്റുകൾ, വാണിജ്യ സമുച്ചയങ്ങൾ എന്നിവയ്ക്ക് ആവശ്യമായ എല്ലാ മെറ്റീരിയലുകളും നേരിട്ട് വിതരണം ചെയ്യുന്നു.'}
            </p>
            <div className="bulk-banner-actions">
              <button
                type="button"
                onClick={() => {
                  const msg = encodeURIComponent(
                    lang === 'en'
                      ? "Hi Doorcarts Project Desk, I have a residential/commercial project requirement and need bulk wholesale quotation."
                      : "ഹലോ ഡോർകാർട്സ്, എനിക്ക് ഒരു നിർമ്മാണ പ്രോജക്റ്റിലേക്ക് മെറ്റീരിയലുകളുടെ മൊത്തവില വിവരങ്ങൾ ആവശ്യമുണ്ട്."
                  );
                  window.open(`https://wa.me/${whatsappNumber.replace('+', '')}?text=${msg}`, '_blank', 'noopener,noreferrer');
                }}
                className="bulk-whatsapp-btn"
              >
                <MessageCircle size={18} />
                <span>{lang === 'en' ? 'Connect with Project Desk' : 'പ്രോജക്റ്റ് ഡെസ്കുമായി ബന്ധപ്പെടുക'}</span>
              </button>
              <Link href="/contact" className="bulk-contact-link">
                <span>{lang === 'en' ? 'Visit Regional Offices' : 'ഓഫീസുകൾ സന്ദർശിക്കുക'}</span>
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
