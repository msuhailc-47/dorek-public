import Link from 'next/link';
import { Users, Store, Building2, TrendingUp, Briefcase, Handshake, Package, Truck, ArrowRight } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import './Opportunities.css';
import useScrollReveal from '../utils/useScrollReveal';

const iconMap = { Users, Store, Building2, TrendingUp, Briefcase, Handshake, Package, Truck };
const accents = ['#00b4d8','#d4a843','#10b981','#8b5cf6','#f59e0b','#ef4444','#06b6d4','#3b82f6'];

export default function Opportunities({ lang, t }) {
  const { ref: scrollRef, className: scrollClass } = useScrollReveal();
    return (
    <section id="opportunities" className={`section opp ${scrollClass}`} ref={scrollRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.opportunities.label}</span>
          <h2 className="section-title">{t.opportunities.title}</h2>
          <p className="section-subtitle">{t.opportunities.subtitle}</p>
        </div>
        <div className="opp-grid">
          {(t.opportunities.items || []).map((item, i) => {
            const Icon = iconMap[item.icon] || Users;
            const accent = accents[i % accents.length];
            return (
              <div key={i} className="opp-card" style={{ borderTopColor: accent, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div className="opp-card-icon" style={{ background: `${accent}20`, color: accent }}>
                    <Icon size={28} />
                  </div>
                  <h3 className="opp-card-name">{item.name}</h3>
                  <p className="opp-card-desc">{item.desc}</p>
                </div>
                <Link
                  href={`/contact?subject=${encodeURIComponent('Franchise')}&topic=${encodeURIComponent(`${item.name} Partnership`)}`}
                  style={{
                    marginTop: '16px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    color: accent,
                    textDecoration: 'none'
                  }}
                >
                  <span>{lang === 'en' ? 'Enquire Now' : 'അപേക്ഷിക്കുക'}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
        <div className="opp-cta">
          <Link href="/contact?subject=Franchise" className="btn btn-gold btn-lg">
            {t.opportunities?.applyNow || 'Apply Now'} <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

