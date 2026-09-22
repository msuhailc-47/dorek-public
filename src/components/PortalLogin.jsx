"use client";
import { X, Lock, User, ArrowRight } from 'lucide-react';
import './PortalLogin.css';

export default function PortalLogin({ lang, t, isOpen, onClose }) {
    if (!isOpen) return null;

  return (
    <div className="portal-overlay" onClick={onClose}>
      <div className="portal-modal" onClick={e => e.stopPropagation()}>
        <button className="portal-close" onClick={onClose} aria-label="Close Portal Login Modal"><X size={20} /></button>
        <div className="portal-header">
          <div className="portal-logo">DOREK</div>
          <p>{t.portal.partnerPortal}</p>
        </div>
        <form className="portal-form" onSubmit={e => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="portal-username">{t.portal.username}</label>
            <div className="portal-input-group">
              <User size={18} className="portal-input-icon" />
              <input id="portal-username" type="text" className="form-control" placeholder={t.portal.enterId} aria-label={t.portal.username} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="portal-password">{t.portal.password}</label>
            <div className="portal-input-group">
              <Lock size={18} className="portal-input-icon" />
              <input id="portal-password" type="password" className="form-control" placeholder="••••••••" aria-label={t.portal.password} />
            </div>
          </div>
          <div className="portal-options">
            <label className="portal-checkbox"><input type="checkbox" /> {t.portal.rememberMe}</label>
            <a href="#" className="portal-forgot">{t.portal.forgot}</a>
          </div>
          <button type="submit" className="btn btn-primary btn-block">{t.portal.login} <ArrowRight size={16} /></button>
        </form>
      </div>
    </div>
  );
}

