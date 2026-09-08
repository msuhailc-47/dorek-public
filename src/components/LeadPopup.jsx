import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import './LeadPopup.css';

export default function LeadPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { addSubmission, themeSettings } = useCMS();

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const hasSubmitted = localStorage.getItem('dorek_lead_submitted');
    const hasClosedSession = sessionStorage.getItem('dorek_popup_closed');

    if (hasSubmitted || hasClosedSession) {
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 15000); // 15 seconds delay

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    sessionStorage.setItem('dorek_popup_closed', 'true');
    setIsVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    setIsSubmitting(true);
    
    // Save to Firebase via context
    addSubmission({
      name: formData.name,
      phone: formData.phone,
      email: formData.email || 'N/A',
      subject: 'Lead Capture Popup',
      message: 'Lead generated from the automatic 15-second popup.'
    });

    // Send Email via API
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || 'lead@dorek.in',
          subject: 'Lead Capture Popup',
          message: 'Lead generated from the automatic 15-second popup.',
          adminEmail: themeSettings?.adminEmail
        })
      });
    } catch (err) {
      console.error(err);
    }

    localStorage.setItem('dorek_lead_submitted', 'true');
    setIsSuccess(true);
    setIsSubmitting(false);

    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  if (!isVisible) return null;

  return (
    <div className="lead-popup-overlay">
      <div className="lead-popup-container">
        <button className="lead-popup-close" onClick={handleClose}><X size={20} /></button>
        
        {!isSuccess ? (
          <div className="lead-popup-content">
            <div className="lead-popup-header">
              <h2>Let's Grow Together!</h2>
              <p>Enter your details below and our team will get in touch with you to discuss business opportunities.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="lead-popup-form">
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Your Full Name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="tel" 
                  placeholder="WhatsApp / Phone Number" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Request Callback'} <ArrowRight size={18} />
              </button>
            </form>
            <div className="lead-popup-footer">
              <ShieldCheck size={14} /> Your information is 100% secure with us.
            </div>
          </div>
        ) : (
          <div className="lead-popup-success">
            <div className="success-icon">✓</div>
            <h3>Thank You!</h3>
            <p>Our team will contact you shortly.</p>
          </div>
        )}
      </div>
    </div>
  );
}
