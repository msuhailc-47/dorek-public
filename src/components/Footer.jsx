"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import './Footer.css';

const FacebookIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const InstagramIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const TwitterIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const LinkedinIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;
const YoutubeIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>;

export default function Footer({ lang, t }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-col brand-col">
            <Link href="/" className="footer-logo" style={{display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none'}} title="Dorek International">
              <div style={{background: '#ffffff', padding: '6px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Image 
                  src="/logo.png" 
                  alt="Dorek Logo" 
                  width={33} 
                  height={36} 
                  style={{height: '36px', width: '33px', aspectRatio: '459 / 500', objectFit: 'contain'}} 
                />
              </div>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <span className="navbar-logo-text" style={{color: '#ffffff', fontSize: '24px', paddingBottom: '4px'}}>DOREK</span>
                <span style={{color: '#d4af37', fontSize: '10px', fontWeight: '700', letterSpacing: '2.5px', marginTop: '4px'}}>INTERNATIONAL</span>
              </div>
            </Link>
            <p className="footer-desc">{t.footer?.description || 'A diversified corporate conglomerate delivering excellence across industries.'}</p>
            <div className="social-links">
              {t.footer?.facebook && <a href={t.footer.facebook} target="_blank" rel="noopener noreferrer" aria-label="Follow Dorek International on Facebook"><FacebookIcon /></a>}
              {t.footer?.instagram && <a href={t.footer.instagram} target="_blank" rel="noopener noreferrer" aria-label="Follow Dorek International on Instagram"><InstagramIcon /></a>}
              {t.footer?.twitter && <a href={t.footer.twitter} target="_blank" rel="noopener noreferrer" aria-label="Follow Dorek International on Twitter"><TwitterIcon /></a>}
              {t.footer?.linkedin && <a href={t.footer.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Connect with Dorek International on LinkedIn"><LinkedinIcon /></a>}
              {t.footer?.youtube && <a href={t.footer.youtube} target="_blank" rel="noopener noreferrer" aria-label="Watch Dorek International on YouTube"><YoutubeIcon /></a>}
            </div>
          </div>
          <div className="footer-col">
            <h4>{t.footer?.quickLinks || 'Quick Links'}</h4>
            <ul className="footer-links">
              <li><Link href="/about">{t.nav?.about || 'About'}</Link></li>
              <li><Link href="/businesses">{t.nav?.businesses || 'Businesses'}</Link></li>
              <li><Link href="/businesses#products">{t.nav?.services || 'Products & Services'}</Link></li>
              <li><Link href="/businesses#opportunities">{t.nav?.opportunities || 'Opportunities'}</Link></li>
              <li><Link href="/media#investors">{t.nav?.investors || 'Investors'}</Link></li>
              <li><Link href="/careers">{t.nav?.careers || 'Careers'}</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t.footer?.legal || 'Legal'}</h4>
            <ul className="footer-links">
              <li><Link href="/privacy">{t.footer?.privacy || 'Privacy Policy'}</Link></li>
              <li><Link href="/terms">{t.footer?.terms || 'Terms & Conditions'}</Link></li>
              <li><Link href="/refund">{t.footer?.refund || 'Refund Policy'}</Link></li>
              <li><Link href="/disclaimer">{t.footer?.disclaimer || 'Disclaimer'}</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t.footer?.connect || 'Contact Us'}</h4>
            <ul className="footer-contact">
              <li><MapPin size={16} className="fc-icon" /> <span style={{whiteSpace: 'pre-line'}}>{t.contact?.address || '1st Floor, Dorek Building, Ernakulam, Kerala'}</span></li>
              <li><Phone size={16} className="fc-icon" /> <span>{t.contact?.phone || '+91 98765 43210'}</span></li>
              <li><Mail size={16} className="fc-icon" /> <span>{t.contact?.email || 'info@dorek.com'}</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t.footer?.copyright || `© ${new Date().getFullYear()} Dorek International Enterprises LLP. All rights reserved.`}</p>
          <button className="back-to-top" onClick={() => window.scrollTo({top:0, behavior:'smooth'})} aria-label="Scroll back to top of page">
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}

