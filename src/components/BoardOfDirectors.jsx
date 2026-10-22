"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Users, Briefcase, Award, CheckCircle2 } from 'lucide-react';
import { getOptimizedUrl, convertDriveUrl } from '../utils/getOptimizedUrl';
import translations from '../i18n/translations';
import './BoardOfDirectors.css';

export default function BoardOfDirectors({ lang, t }) {
  // Top 5 Executive Founders
  const rawFounders = (t?.about?.founders && t.about.founders.length > 0)
    ? t.about.founders
    : (translations[lang]?.about?.founders || translations.en?.about?.founders || []);
  const execFounders = rawFounders.slice(0, 5);

  // 8 Board Members / Directors
  const rawBoardMembers = (t?.about?.boardMembers && t.about.boardMembers.length > 0)
    ? t.about.boardMembers
    : (translations[lang]?.about?.boardMembers || translations.en?.about?.boardMembers || []);
  const boardMembers = rawBoardMembers;

  return (
    <div className="directors-page">
      <div className="container">
        
        {/* Hero / Header Section */}
        <div className="directors-hero">
          <nav className="directors-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">{lang === 'en' ? 'Home' : 'ഹോം'}</Link>
            <span className="breadcrumb-separator">/</span>
            <Link href="/#about">{lang === 'en' ? 'About Us' : 'ഞങ്ങളെക്കുറിച്ച്'}</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{lang === 'en' ? 'Board of Directors' : 'ഡയറക്ടർ ബോർഡ്'}</span>
          </nav>

          <div className="directors-badge-wrap">
            <div className="directors-badge">
              <Shield size={14} />
              <span>{lang === 'en' ? 'Corporate Governance & Leadership' : 'കോർപ്പറേറ്റ് നേതൃത്വം'}</span>
            </div>
          </div>

          <h1 className="directors-title">
            {lang === 'en' ? 'Board of Directors & Leadership' : 'ഡയറക്ടർ ബോർഡ് & നേതൃത്വം'}
          </h1>

          <p className="directors-subtitle">
            {lang === 'en'
              ? 'Meet the 13 directors and visionary leaders guiding Dorek International Enterprises LLP across multi-sector commerce, sustainable operations, and corporate excellence.'
              : 'ഡോറക് ഇന്റർനാഷണൽ എന്റർപ്രൈസസ് എൽഎൽപിയെ നയിക്കുന്ന 13 അംഗ ഡയറക്ടർ ബോർഡും എക്സിക്യൂട്ടീവ് നേതൃത്വവും.'}
          </p>
        </div>

        {/* Group 1: 5 Executive Founders & Leadership */}
        <div className="directors-subgroup">
          <div className="directors-subgroup-header">
            <h2 className="directors-subgroup-title">
              <Briefcase size={22} color="#0A2E5D" />
              <span>{lang === 'en' ? 'Executive Leadership & Founders' : 'സ്ഥാപകരും എക്സിക്യൂട്ടീവ് നേതൃത്വവും'}</span>
            </h2>
            <span className="directors-count-pill gold">5 {lang === 'en' ? 'Members' : 'അംഗങ്ങൾ'}</span>
          </div>

          <div className="directors-exec-grid">
            {execFounders.map((founder, idx) => (
              <div key={idx} className="director-exec-card">
                <div className="director-exec-photo-wrapper">
                  {founder.photo ? (
                    <img
                      src={getOptimizedUrl(founder.photo)}
                      alt={founder.name}
                      className="director-exec-photo"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const direct = convertDriveUrl(founder.photo);
                        if (direct && e.target.src !== direct) {
                          e.target.src = direct;
                        }
                      }}
                    />
                  ) : (
                    <div className="director-exec-placeholder">
                      <span>{founder.name ? founder.name.charAt(0) : 'D'}</span>
                    </div>
                  )}
                </div>

                <h3 className="director-exec-name">{founder.name}</h3>
                <span className="director-exec-role">{founder.role}</span>
                <p className="director-exec-bio">{founder.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Group 2: 8 Board of Directors (Names Display) */}
        <div className="directors-subgroup">
          <div className="directors-subgroup-header">
            <h2 className="directors-subgroup-title">
              <Users size={22} color="#0A2E5D" />
              <span>{lang === 'en' ? 'Board of Directors' : 'ഡയറക്ടർ ബോർഡ് അംഗങ്ങൾ'}</span>
            </h2>
            <span className="directors-count-pill">{boardMembers.length} {lang === 'en' ? 'Directors' : 'ഡയറക്ടർമാർ'}</span>
          </div>

          <div className="directors-board-grid">
            {boardMembers.map((member, idx) => {
              const initials = (member.name || '')
                .split(' ')
                .filter(Boolean)
                .map(w => w[0])
                .slice(0, 2)
                .join('')
                .toUpperCase() || `D${idx + 1}`;

              return (
                <div key={idx} className="director-board-card">
                  {member.photo ? (
                    <div className="director-board-photo-wrap" style={{ width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden', marginBottom: '12px', border: '2px solid #D4AF37' }}>
                      <img
                        src={convertDriveUrl(member.photo)}
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <div className="director-board-avatar">
                      <span>{initials}</span>
                    </div>
                  )}
                  <h3 className="director-board-name">{member.name}</h3>
                  <span className="director-board-badge">
                    <CheckCircle2 size={12} color="#D4AF37" />
                    <span>{member.role || (lang === 'en' ? 'Board Member' : 'ബോർഡ് മെമ്പർ')}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="directors-footer-bar">
          <div className="directors-footer-text">
            <h4>{lang === 'en' ? 'Committed to Ethical Leadership' : 'സുതാര്യവും ഉത്തരവാദിത്തമുള്ളതുമായ നേതൃത്വം'}</h4>
            <p>{lang === 'en' ? 'Leading sustainable growth with integrity and enterprise innovation.' : 'ഗുണനിലവാരത്തിലും സത്യസന്ധതയിലും ഊന്നിയ കോർപ്പറേറ്റ് പ്രവർത്തനം.'}</p>
          </div>

          <Link href="/#about" className="directors-back-btn">
            <ArrowLeft size={16} />
            <span>{lang === 'en' ? 'Back to About Us' : 'തിരികെ എബൗട്ടിലേക്ക്'}</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
