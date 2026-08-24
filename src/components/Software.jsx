"use client";
import { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Receipt, Package, Calculator, Clock, Smartphone } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import './Software.css';
import useScrollReveal from '../utils/useScrollReveal';

const iconMap = { LayoutDashboard, Users, Receipt, Package, Calculator, Clock, Smartphone };
const mockColors = ['#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#06b6d4', '#3b82f6'];

export default function Software({ lang, t }) {
  const { ref: scrollRef, className: scrollClass } = useScrollReveal();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="software" className={`section software ${scrollClass}`} ref={scrollRef}>
      <div className="software-grid-pattern" />
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.software.label}</span>
          <h2 className="section-title">{t.software.title}</h2>
          <p className="section-subtitle">{t.software.subtitle}</p>
        </div>
        <div className="sw-grid">
          {t.software.items.map((item, i) => {
            const Icon = iconMap[item.icon] || LayoutDashboard;
            return (
              <div key={i} className="sw-card">
                <div className="sw-mockup" style={{ borderColor: `${mockColors[i]}30` }}>
                  <div className="sw-mockup-header">
                    <div className="sw-dots"><span /><span /><span /></div>
                    <div className="sw-mockup-title" style={{ background: `${mockColors[i]}30` }} />
                  </div>
                  <div className="sw-mockup-body">
                    {mounted ? (
                      <>
                        <div className="sw-mock-sidebar" style={{ background: `${mockColors[i]}15` }}>
                          {[...Array(4)].map((_,j) => <div key={j} className="sw-mock-bar" style={{ background: `${mockColors[i]}25`, width: `${60+j*10}%` }}/>)}
                        </div>
                        <div className="sw-mock-content">
                          <div className="sw-mock-chart" style={{ background: `${mockColors[i]}10` }}>
                            {[...Array(5)].map((_,j) => <div key={j} className="sw-mock-col" style={{ background: mockColors[i], height: `${20+Math.random()*60}%`, opacity: 0.5+Math.random()*0.5 }}/>)}
                          </div>
                          <div className="sw-mock-rows">
                            {[...Array(3)].map((_,j) => <div key={j} className="sw-mock-row" style={{ background: `${mockColors[i]}12` }}/>)}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="sw-mock-content" style={{ opacity: 0 }} />
                    )}
                  </div>
                </div>
                <div className="sw-card-info">
                  <div className="sw-card-icon" style={{ background: `${mockColors[i]}20`, color: mockColors[i] }}>
                    <Icon size={22} />
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="sw-cta">
          <button className="btn btn-primary btn-lg">Request Demo →</button>
        </div>
      </div>
    </section>
  );
}

