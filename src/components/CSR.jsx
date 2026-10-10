"use client";
import Link from 'next/link';
import { Heart, Users, GraduationCap, Leaf, ArrowRight } from 'lucide-react';
import './CSR.css';
import useScrollReveal from '../utils/useScrollReveal';

const icons = [Heart, Users, GraduationCap, Leaf];
const accents = ['#ef4444', '#00b4d8', '#f59e0b', '#10b981'];

export default function CSR({ lang, t }) {
  const { ref: scrollRef, className: scrollClass } = useScrollReveal();

  if (!t?.csr) return null;

  return (
    <section id="csr" className={`section csr-sec ${scrollClass}`} ref={scrollRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.csr.label || 'CSR'}</span>
          <h2 className="section-title">{t.csr.title}</h2>
          <p className="section-subtitle">{t.csr.subtitle}</p>
        </div>
        <div className="csr-grid">
          {(t.csr?.items || []).map((item, i) => {
            const Icon = icons[i % icons.length];
            const accent = accents[i % accents.length];
            return (
              <div key={i} className="csr-card" style={{ borderTopColor: accent }}>
                <div className="csr-card-icon" style={{ background: `${accent}20`, color: accent }}>
                  <Icon size={28} />
                </div>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </div>
            );
          })}
        </div>
        <div className="csr-cta">
          <p>
            {lang === 'en'
              ? 'Want to partner with us for a social cause?'
              : 'സാമൂഹിക സേവന പ്രവർത്തനങ്ങളിൽ ഞങ്ങളോടൊപ്പം ചേരാൻ താല്പര്യമുണ്ടോ?'}
          </p>
          <Link href="/contact" className="btn btn-primary">
            {lang === 'en' ? 'Partner With Us' : 'ഞങ്ങളുമായി സഹകരിക്കാം'} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
