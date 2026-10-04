"use client";
import Link from 'next/link';
import { TrendingUp, PieChart, DollarSign, BarChart3, ArrowRight } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import './Investors.css';
import useScrollReveal from '../utils/useScrollReveal';

const icons = [TrendingUp, PieChart, DollarSign, BarChart3];
const accents = ['#d4a843','#10b981','#00b4d8','#8b5cf6'];

export default function Investors({ lang, t }) {
  const { ref: scrollRef, className: scrollClass } = useScrollReveal();
    return (
    <section id="investors" className={`section investors-sec ${scrollClass}`} ref={scrollRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.investors.label}</span>
          <h2 className="section-title">{t.investors.title}</h2>
          <p className="section-subtitle">{t.investors.subtitle}</p>
        </div>
        <div className="inv-grid">
          {t.investors.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="inv-card" style={{ borderTopColor: accents[i] }}>
                <div className="inv-card-icon" style={{ background: `${accents[i]}20`, color: accents[i] }}>
                  <Icon size={28} />
                </div>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </div>
            );
          })}
        </div>
        <div className="inv-cta">
          <div className="inv-cta-card">
            <h3>{lang === 'en' ? 'Become an Investor' : 'നിക്ഷേപകനാകൂ'}</h3>
            <p>{lang === 'en' ? "Join Dorek's growth story with transparent governance and attractive returns." : 'സുതാര്യമായ ഭരണവും ആകർഷകമായ ലാഭവിഹിതവുമുള്ള ഡോറെക്കിന്റെ വളർച്ചയിൽ പങ്കാളിയാകൂ.'}</p>
            <Link href="/contact" className="btn btn-gold btn-lg" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span>{lang === 'en' ? 'Invest Now' : 'ഇപ്പോൾ നിക്ഷേപിക്കുക'}</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

