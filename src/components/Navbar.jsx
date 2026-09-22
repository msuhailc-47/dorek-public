"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import './Navbar.css';

export default function Navbar({ minimal = false, lang, t, onLangChange }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState(null);
  const { isSectionVisible } = useCMS();
  const navRef = useRef(null);
  const pathname = usePathname() || '/';

  // Grouped Navigation Definition with multi-page routes
  const navGroups = [
    {
      id: 'home',
      label: lang === 'en' ? 'Home' : 'ഹോം',
      type: 'direct',
      path: '/'
    },
    {
      id: 'businesses',
      label: lang === 'en' ? 'Businesses' : 'ബിസിനസുകൾ',
      type: 'dropdown',
      path: '/businesses',
      items: [
        { id: 'businesses', label: t.nav?.businesses || (lang === 'en' ? 'Our Divisions' : 'ഡിവിഷനുകൾ'), desc: 'Doorcarts, Solar, Engineering & Tech', path: '/businesses' },
        { id: 'products', label: t.nav?.products || (lang === 'en' ? 'Products & Solutions' : 'ഉൽപ്പന്നങ്ങൾ'), desc: 'Complete catalog of products & equipment', path: '/businesses#products' },
        { id: 'software', label: t.nav?.software || (lang === 'en' ? 'Software & Tech' : 'ടെക്നോളജി'), desc: 'Dorek Pulse, ERP & cloud platforms', path: '/businesses#software' },
        { id: 'network', label: t.nav?.network || (lang === 'en' ? 'Districts Network' : 'ശൃംഖല'), desc: 'Pan-Kerala presence & footprint', path: '/businesses#network' },
        { id: 'opportunities', label: t.nav?.opportunities || (lang === 'en' ? 'Franchise & Partnering' : 'ബിസിനസ് അവസരങ്ങൾ'), desc: 'Dealerships, stores & investor models', path: '/businesses#opportunities' }
      ]
    },
    {
      id: 'media',
      label: lang === 'en' ? 'Media & Hub' : 'മീഡിയ & നെറ്റ്വർക്ക്',
      type: 'dropdown',
      path: '/media',
      items: [
        { id: 'gallery', label: t.nav?.gallery || (lang === 'en' ? 'Media Gallery' : 'മീഡിയ ഗാലറി'), desc: 'Photos, videos & showroom moments', path: '/media#gallery' },
        { id: 'news', label: t.nav?.news || (lang === 'en' ? 'News & Press' : 'വാർത്തകൾ'), desc: 'Latest press releases & announcements', path: '/media#news' },
        { id: 'investors', label: t.nav?.investors || (lang === 'en' ? 'Investor Relations' : 'നിക്ഷേപകർ'), desc: 'Financial growth & partnerships', path: '/media#investors' },
        { id: 'downloads', label: t.nav?.downloads || (lang === 'en' ? 'Downloads' : 'ഡൗൺലോഡുകൾ'), desc: 'Brochures, catalog & documents', path: '/media#downloads' }
      ]
    },
    {
      id: 'careers',
      label: lang === 'en' ? 'Careers' : 'കരിയർ',
      type: 'direct',
      path: '/careers'
    },
    {
      id: 'contact',
      label: t.nav?.contact || (lang === 'en' ? 'Contact' : 'കോൺടാക്റ്റ്'),
      type: 'direct',
      path: '/contact'
    }
  ];

  // Filter groups and items by CMS section visibility
  const filteredNavGroups = navGroups.map(group => {
    if (group.type === 'direct') {
      const sectionKey = group.id;
      return isSectionVisible(sectionKey) ? group : null;
    }
    const visibleItems = group.items.filter(item => isSectionVisible(item.id));
    if (visibleItems.length === 0) return null;
    return { ...group, items: visibleItems };
  }).filter(Boolean);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavClick = (e, path) => {
    setMobileOpen(false);
    setOpenDropdown(null);

    if (!path) return;

    const [targetPath, targetHash] = path.split('#');
    const isSamePage = pathname === targetPath || (pathname === '/' && targetPath === '');

    if (isSamePage) {
      if (e && e.preventDefault) e.preventDefault();
      if (targetHash) {
        const el = document.getElementById(targetHash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', path);
          return;
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }
  };

  return (
    <nav ref={navRef} className={`navbar ${(scrolled || minimal) ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link href="/" className="navbar-logo">
          <div className="navbar-logo-wrapper">
            <Image 
              src="/logo.png" 
              alt="Dorek International Logo" 
              width={41} 
              height={45} 
              priority
              style={{ aspectRatio: '459 / 500', objectFit: 'contain' }}
              className="navbar-logo-img" 
            />
          </div>
          <div className="navbar-brand-col">
            <span className="navbar-logo-text">DOREK</span>
            <span className="navbar-logo-tagline">ENTERPRISES LLP</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        {!minimal && (
          <div className="navbar-menu-desktop">
            {filteredNavGroups.map(group => {
              if (group.type === 'direct') {
                const isActive = pathname === group.path;
                return (
                  <Link
                    key={group.id}
                    href={group.path}
                    className={`nav-item-btn ${isActive ? 'nav-item-active' : ''}`}
                    onClick={(e) => handleNavClick(e, group.path)}
                  >
                    <span>{group.label}</span>
                  </Link>
                );
              }

              const isOpen = openDropdown === group.id;
              const hasActiveChild = pathname.startsWith(group.path) || group.items.some(item => pathname === item.path.split('#')[0]);

              return (
                <div
                  key={group.id}
                  className="nav-dropdown-wrapper"
                  onMouseEnter={() => setOpenDropdown(group.id)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={group.path}
                    className={`nav-item-btn ${hasActiveChild ? 'nav-item-active' : ''} ${isOpen ? 'nav-item-open' : ''}`}
                    onClick={(e) => handleNavClick(e, group.path)}
                    aria-expanded={isOpen}
                  >
                    <span>{group.label}</span>
                    <ChevronDown size={14} className={`dropdown-chevron ${isOpen ? 'rotate-180' : ''}`} />
                  </Link>

                  {/* Dropdown Menu Box */}
                  {isOpen && (
                    <div className="nav-dropdown-menu">
                      <div className="nav-dropdown-inner">
                        {group.items.map(item => (
                          <Link
                            key={item.id}
                            href={item.path}
                            className="dropdown-item-card"
                            onClick={(e) => handleNavClick(e, item.path)}
                          >
                            <div className="dropdown-item-title">{item.label}</div>
                            {item.desc && <div className="dropdown-item-desc">{item.desc}</div>}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Right Actions Cluster */}
        <div className="navbar-actions">
          {minimal && (
            <Link href="/" className="navbar-back-btn" aria-label="Back to Home">
              ← {lang === 'en' ? 'Back to Home' : 'ഹോം'}
            </Link>
          )}

          {/* Language Toggle */}
          <button 
            className="navbar-lang-pill" 
            onClick={onLangChange}
            title={lang === 'en' ? 'മലയാളം' : 'English'}
            aria-label={lang === 'en' ? 'മലയാളം - Switch language' : 'English - ഭാഷ മാറ്റുക'}
          >
            <Globe size={14} />
            <span>{lang === 'en' ? 'മലയാളം' : 'English'}</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          {!minimal && (
            <button 
              className="navbar-hamburger-btn" 
              onClick={() => setMobileOpen(true)}
              aria-label="Open Mobile Menu"
            >
              <Menu size={22} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileOpen && !minimal && (
        <>
          <div className="navbar-mobile-drawer animate-slideLeft">
            <div className="mobile-drawer-header">
              <Link href="/" className="navbar-logo" onClick={() => setMobileOpen(false)}>
                <div className="navbar-logo-wrapper">
                  <Image 
                    src="/logo.png" 
                    alt="Dorek International Logo" 
                    width={37} 
                    height={40} 
                    style={{ aspectRatio: '459 / 500', objectFit: 'contain' }}
                    className="navbar-logo-img" 
                  />
                </div>
                <span className="navbar-logo-text">DOREK</span>
              </Link>
              <button 
                className="mobile-drawer-close" 
                onClick={() => setMobileOpen(false)}
                aria-label="Close Menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="mobile-drawer-body">
              {filteredNavGroups.map(group => {
                if (group.type === 'direct') {
                  const isActive = pathname === group.path;
                  return (
                    <Link
                      key={group.id}
                      href={group.path}
                      className={`mobile-nav-link ${isActive ? 'mobile-link-active' : ''}`}
                      onClick={(e) => handleNavClick(e, group.path)}
                    >
                      {group.label}
                    </Link>
                  );
                }

                const isExpanded = mobileExpandedGroup === group.id;

                return (
                  <div key={group.id} className="mobile-nav-accordion">
                    <div 
                      className="mobile-accordion-header"
                      onClick={() => setMobileExpandedGroup(isExpanded ? null : group.id)}
                    >
                      <span>{group.label}</span>
                      <ChevronDown size={16} className={`accordion-chevron ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>

                    {isExpanded && (
                      <div className="mobile-accordion-content animate-fadeIn">
                        {group.items.map(item => (
                          <Link
                            key={item.id}
                            href={item.path}
                            className="mobile-sub-link"
                            onClick={(e) => handleNavClick(e, item.path)}
                          >
                            <span className="mobile-sub-title">{item.label}</span>
                            {item.desc && <span className="mobile-sub-desc">{item.desc}</span>}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mobile-drawer-footer">
              <button 
                className="mobile-lang-btn" 
                onClick={onLangChange}
                aria-label={lang === 'en' ? 'മലയാളത്തിലേക്ക് മാറ്റുക - Switch language' : 'Switch to English - ഭാഷ മാറ്റുക'}
              >
                <Globe size={16} />
                <span>{lang === 'en' ? 'മലയാളത്തിലേക്ക് മാറ്റുക' : 'Switch to English'}</span>
              </button>
            </div>
          </div>
          <div className="navbar-overlay" onClick={() => setMobileOpen(false)} />
        </>
      )}
    </nav>
  );
}
