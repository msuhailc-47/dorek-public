"use client";
import { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import './Contact.css';
import useScrollReveal from '../utils/useScrollReveal';

export default function Contact({ lang, t }) {
  const { addSubmission, themeSettings } = useCMS();
  const { ref: scrollRef, className: scrollClass } = useScrollReveal();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '', honeypot: '' });
  
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Honeypot check - if bot fills this hidden field, silently reject
    if (formData.honeypot !== '') {
      console.log('Spam detected');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', honeypot: '' });
      return;
    }

    if (!formData.name || !formData.email || !formData.message) return;
    
    // Save to Firestore
    addSubmission({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message
    });
    
    // Send email notification (non-blocking, but we'll await it to catch errors in dev)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          adminEmail: themeSettings?.adminEmail 
        }),
      });
      const data = await response.json();
      if (!response.ok || data.error) {
        console.error('Email API Error:', data);
      } else {
        console.log('Email sent successfully:', data);
      }
    } catch (err) {
      console.error('Email notification failed:', err);
    }
    
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '', honeypot: '' });
  };
  
  return (
    <section id="contact" className={`section contact-sec ${scrollClass}`} ref={scrollRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.contact.label}</span>
          <h2 className="section-title">{t.contact.title}</h2>
          <p className="section-subtitle">{t.contact.subtitle}</p>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-info-card">
              <div className="contact-icon"><MapPin size={24} /></div>
              <div>
                <h4>{t.contact.addressLabel}</h4>
                <p style={{ whiteSpace: 'pre-line' }}>{t.contact.address}</p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-icon"><Phone size={24} /></div>
              <div>
                <h4>{t.contact.phoneLabel}</h4>
                <p>{t.contact.phone}<br />{t.contact.whatsapp && `WA: ${t.contact.whatsapp}`}</p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-icon"><Mail size={24} /></div>
              <div>
                <h4>{t.contact.emailLabel}</h4>
                <p>{t.contact.email}</p>
              </div>
            </div>
            <div className="contact-map">
              {t.contact.mapUrl ? (
                <iframe
                  src={t.contact.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '250px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Location"
                ></iframe>
              ) : (
                <div className="contact-map-placeholder">
                  <MapPin size={40} />
                  <span>Google Maps Embed</span>
                </div>
              )}
            </div>
          </div>
          <div className="contact-form">
            <h3>Send us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder={t.contact.formName} required />
              </div>
              <div className="form-group">
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder={t.contact.formEmail} required />
              </div>
              <div className="form-group">
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-control" placeholder={t.contact.formPhone} required />
              </div>
              <div className="form-group">
                <select name="subject" value={formData.subject} onChange={handleChange} className="form-control">
                  <option value="" disabled>{t.contact.formSubject}</option>
                  {(t.contact.formOptions || []).map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <textarea name="message" value={formData.message} onChange={handleChange} className="form-control" placeholder={t.contact.formMessage} rows="5" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                {t.contact.formSubmit} <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

