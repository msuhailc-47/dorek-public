"use client";
import { useState, useRef, useEffect } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import './Contact.css';
import useScrollReveal from '../utils/useScrollReveal';

export default function Contact({ lang, t }) {
  const { addSubmission, themeSettings } = useCMS();
  const { ref: scrollRef, className: scrollClass } = useScrollReveal();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '', honeypot: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const subjectParam = params.get('subject') || '';
    const topicParam = params.get('topic') || '';
    if (!subjectParam && !topicParam) return;

    const options = t.contact?.formOptions || [];
    let matchedSubject = '';
    if (subjectParam) {
      const lowerSub = subjectParam.toLowerCase();
      matchedSubject = options.find(opt => opt.toLowerCase().includes(lowerSub)) || options[0] || subjectParam;
    }

    setFormData(prev => ({
      ...prev,
      subject: matchedSubject || prev.subject,
      message: topicParam && !prev.message
        ? (lang === 'en'
            ? `I would like to enquire about: ${topicParam}`
            : `${topicParam} സംബന്ധിച്ച വിവരങ്ങൾ അറിയാൻ താല്പര്യപ്പെടുന്നു.`)
        : prev.message
    }));
  }, [lang, t.contact?.formOptions]);

  const handleChange = (e) => {
    if (submitStatus) setSubmitStatus(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Strict lock against duplicate double clicks
    if (isSubmittingRef.current || isSubmitting) return;

    // Honeypot check - if bot fills this hidden field, silently reject
    if (formData.honeypot !== '') {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', honeypot: '' });
      return;
    }

    const cleanName = (formData.name || '').trim();
    const cleanEmail = (formData.email || '').trim();
    const cleanMessage = (formData.message || '').trim();
    const cleanPhone = (formData.phone || '').trim();
    const cleanSubject = (formData.subject || '').trim();

    if (!cleanName || !cleanEmail || !cleanMessage) {
      setSubmitStatus({
        type: 'error',
        text: lang === 'en' ? 'Please fill in all required fields.' : 'ദയവായി ആവശ്യമായ എല്ലാ വിവരങ്ങളും പൂരിപ്പിക്കുക.'
      });
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Save to Firestore
      addSubmission({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        subject: cleanSubject,
        message: cleanMessage
      });

      // Send email notification in background asynchronously
      fetch('/api/contact', {
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
      }).catch(notifyErr => {
        console.warn('Email notification failed:', notifyErr);
      });

      setSubmitStatus({
        type: 'success',
        text: lang === 'en'
          ? 'Thank you for contacting Dorek International! Our team will get back to you shortly.'
          : 'ഡോറെക് ഇന്റർനാഷണലുമായി ബന്ധപ്പെട്ടതിന് നന്ദി! ഞങ്ങളുടെ ടീം ഉടൻ തന്നെ നിങ്ങളെ ബന്ധപ്പെടുന്നതാണ്.'
      });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', honeypot: '' });
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitStatus({
        type: 'error',
        text: lang === 'en' ? 'An error occurred. Please try again.' : 'എന്തോ തകരാർ സംഭവിച്ചു. ദയവായി വീണ്ടും ശ്രമിക്കുക.'
      });
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const cleanTel = (t.contact?.phone || '').replace(/[^+\d]/g, '');
  const cleanWa = (t.contact?.whatsapp || '').replace(/[^\d]/g, '');

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
                <h3>{t.contact.addressLabel}</h3>
                <p style={{ whiteSpace: 'pre-line' }}>{t.contact.address}</p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-icon"><Phone size={24} /></div>
              <div>
                <h3>{t.contact.phoneLabel}</h3>
                <p>
                  <a href={`tel:${cleanTel}`} style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}>
                    {t.contact.phone}
                  </a>
                  {t.contact.whatsapp && (
                    <>
                      <br />
                      <a
                        href={`https://wa.me/${cleanWa}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'inherit', textDecoration: 'none' }}
                      >
                        WA: {t.contact.whatsapp}
                      </a>
                    </>
                  )}
                </p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-icon"><Mail size={24} /></div>
              <div>
                <h3>{t.contact.emailLabel}</h3>
                <p>
                  <a href={`mailto:${t.contact.email}`} style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}>
                    {t.contact.email}
                  </a>
                </p>
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
            <h3>{lang === 'en' ? 'Send us a Message' : 'സന്ദേശം അയക്കുക'}</h3>
            {submitStatus && (
              <div
                role="status"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '14px 16px',
                  marginBottom: '18px',
                  borderRadius: '12px',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  lineHeight: 1.5,
                  background: submitStatus.type === 'success' ? 'rgba(22, 163, 74, 0.12)' : 'rgba(220, 38, 38, 0.12)',
                  border: `1px solid ${submitStatus.type === 'success' ? '#16A34A' : '#DC2626'}`,
                  color: submitStatus.type === 'success' ? '#15803d' : '#b91c1c'
                }}
              >
                {submitStatus.type === 'success' ? (
                  <CheckCircle2 size={20} style={{ flexShrink: 0, marginTop: '2px', color: '#16A34A' }} />
                ) : (
                  <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px', color: '#DC2626' }} />
                )}
                <span>{submitStatus.text}</span>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="contact-name" className="sr-only">{t.contact.formName}</label>
                <input 
                  id="contact-name"
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className="form-control" 
                  placeholder={t.contact.formName} 
                  aria-label={t.contact.formName}
                  disabled={isSubmitting} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-email" className="sr-only">{t.contact.formEmail}</label>
                <input 
                  id="contact-email"
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  className="form-control" 
                  placeholder={t.contact.formEmail} 
                  aria-label={t.contact.formEmail}
                  disabled={isSubmitting} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-phone" className="sr-only">{t.contact.formPhone}</label>
                <input 
                  id="contact-phone"
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  className="form-control" 
                  placeholder={t.contact.formPhone} 
                  aria-label={t.contact.formPhone}
                  disabled={isSubmitting} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-subject" className="sr-only">{t.contact.formSubject}</label>
                <select 
                  id="contact-subject"
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  className="form-control" 
                  aria-label={t.contact.formSubject}
                  disabled={isSubmitting}
                >
                  <option value="" disabled>{t.contact.formSubject}</option>
                  {(t.contact.formOptions || []).map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="contact-message" className="sr-only">{t.contact.formMessage}</label>
                <textarea 
                  id="contact-message"
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  className="form-control" 
                  placeholder={t.contact.formMessage} 
                  aria-label={t.contact.formMessage}
                  rows="5" 
                  disabled={isSubmitting} 
                  required
                ></textarea>
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
                {isSubmitting ? (lang === 'en' ? 'Sending Message...' : 'അയക്കുന്നു...') : <>{t.contact.formSubmit} <Send size={16} /></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

