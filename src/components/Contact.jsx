"use client";
import { useState, useRef } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import './Contact.css';
import useScrollReveal from '../utils/useScrollReveal';

export default function Contact({ lang, t }) {
  const { addSubmission, themeSettings } = useCMS();
  const { ref: scrollRef, className: scrollClass } = useScrollReveal();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '', honeypot: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);
  
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Strict lock against duplicate double clicks
    if (isSubmittingRef.current || isSubmitting) return;

    // Honeypot check - if bot fills this hidden field, silently reject
    if (formData.honeypot !== '') {
      console.log('Spam detected');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', honeypot: '' });
      return;
    }

    const cleanName = (formData.name || '').trim();
    const cleanEmail = (formData.email || '').trim();
    const cleanMessage = (formData.message || '').trim();
    const cleanPhone = (formData.phone || '').trim();
    const cleanSubject = (formData.subject || '').trim();

    if (!cleanName || !cleanEmail || !cleanMessage) {
      alert('Please fill in all required fields.');
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    
    try {
      // Save to Firestore
      addSubmission({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        subject: cleanSubject,
        message: cleanMessage
      });
      
      // Send email notification
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            name: cleanName,
            email: cleanEmail,
            phone: cleanPhone,
            subject: cleanSubject,
            message: cleanMessage,
            adminEmail: themeSettings?.adminEmail
          }),
        });
        const data = await response.json();
        if (!response.ok || data.error) {
          console.error('Email API Error:', data);
        } else {
          console.log('Email sent successfully:', data);
        }
      } catch (notifyErr) {
        console.error('Email notification failed:', notifyErr);
      }
      
      alert('Thank you for contacting us! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', honeypot: '' });
    } catch (err) {
      console.error('Submission error:', err);
      alert('An error occurred. Please try again.');
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
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
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder={t.contact.formName} disabled={isSubmitting} required />
              </div>
              <div className="form-group">
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder={t.contact.formEmail} disabled={isSubmitting} required />
              </div>
              <div className="form-group">
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-control" placeholder={t.contact.formPhone} disabled={isSubmitting} required />
              </div>
              <div className="form-group">
                <select name="subject" value={formData.subject} onChange={handleChange} className="form-control" disabled={isSubmitting}>
                  <option value="" disabled>{t.contact.formSubject}</option>
                  {(t.contact.formOptions || []).map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <textarea name="message" value={formData.message} onChange={handleChange} className="form-control" placeholder={t.contact.formMessage} rows="5" disabled={isSubmitting} required></textarea>
              </div>
              <button 
                type="submit" 
                className="btn btn-primary btn-block"
                disabled={isSubmitting}
                style={{
                  opacity: isSubmitting ? 0.75 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                {isSubmitting ? 'Sending Message...' : <>{t.contact.formSubmit} <Send size={16} /></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

