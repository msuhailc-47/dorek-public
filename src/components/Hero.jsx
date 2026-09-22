"use client";
import { useState, useRef } from 'react';
import { 
  ArrowRight, 
  ChevronDown, 
  Sparkles, 
  User, 
  Phone, 
  Mail, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import './Hero.css';

export default function Hero({ lang, t }) {
  const { addSubmission, themeSettings } = useCMS();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    honeypot: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isSubmittingRef = useRef(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmittingRef.current || isSubmitting) return;

    // Honeypot spam trap
    if (formData.honeypot !== '') {
      setIsSubmitted(true);
      return;
    }

    const cleanName = (formData.name || '').trim();
    const cleanPhone = (formData.phone || '').trim();
    const cleanEmail = (formData.email || '').trim();
    const cleanMessage = (formData.message || '').trim();

    if (!cleanName || !cleanPhone || !cleanEmail || !cleanMessage) {
      setErrorMessage(lang === 'en' ? 'Please fill in all required fields.' : 'ദയവായി എല്ലാ വിവരങ്ങളും പൂരിപ്പിക്കുക.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMessage(lang === 'en' ? 'Please enter a valid email address.' : 'ശരിയായ ഇമെയിൽ നൽകുക.');
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const submissionData = {
        name: cleanName,
        phone: cleanPhone,
        email: cleanEmail,
        subject: 'Doorcarts Interest / Partnership Enquiry',
        message: cleanMessage,
        source: 'Hero First Section'
      };

      // 1. Dispatch email notification in background asynchronously without blocking UI
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          phone: cleanPhone,
          email: cleanEmail,
          subject: 'Doorcarts Interest / Partnership Enquiry (Hero Form)',
          message: cleanMessage,
          adminEmail: themeSettings?.adminEmail
        })
      }).catch(emailErr => {
        console.warn('Hero form email notification error:', emailErr);
      });

      // 2. Save lead directly to Firestore with fast resolution
      if (typeof addSubmission === 'function') {
        await Promise.race([
          addSubmission(submissionData),
          new Promise(res => setTimeout(res, 2000))
        ]);
      }

      setIsSubmitted(true);
      setFormData({ name: '', phone: '', email: '', message: '', honeypot: '' });
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMessage(lang === 'en' ? 'An error occurred. Please try again.' : 'ഒരു തകരാർ സംഭവിച്ചു. വീണ്ടും ശ്രമിക്കുക.');
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <section id="home" className="hero-modern">
      {/* Background Ambience */}
      <div className="hero-modern-grid" />
      <div className="hero-glow-top" />
      <div className="hero-glow-bottom" />

      <div className="hero-particles" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="hero-particle"
            aria-hidden="true"
            style={{
              left: `${(i * 12.5) % 100}%`,
              top: `${(i * 11.3) % 100}%`,
              animationDelay: `${(i * 0.7)}s`,
              animationDuration: `${8 + (i % 4)}s`
            }}
          />
        ))}
      </div>

      <div className="hero-modern-container">
        {/* Left Column: Authoritative Corporate Pitch */}
        <div className="hero-left-col">
          {/* Subtle Enterprise Badge */}
          <div className="hero-badge-pill">
            <span className="badge-pulse-indicator" />
            <span>{lang === 'en' ? 'DOREK INTERNATIONAL ENTERPRISES LLP' : 'ഡോറക് ഇന്റർനാഷണൽ എന്റർപ്രൈസസ്'}</span>
          </div>

          <h1 className="hero-modern-title">
            <span className="hero-line-white">
              {lang === 'en' ? 'Engineering Excellence.' : 'എഞ്ചിനീയറിംഗ് മികവ്.'}
            </span>
            <span className="hero-line-gold">
              {lang === 'en' ? "Powering Future Brands." : "നാളെയുടെ ബ്രാൻഡുകൾക്ക് കരുത്ത്."}
            </span>
          </h1>

          <p className="hero-modern-desc">
            {t.hero?.subtitle || (lang === 'en'
              ? 'A diversified global enterprise delivering complete turnkey engineering, commercial solar energy, smart retail networks, and enterprise software systems across India and global markets.'
              : 'ടേൺകീ എഞ്ചിനീയറിംഗ്, സോളാർ എനർജി, സ്മാർട്ട് റീട്ടെയിൽ ശൃംഖല, എന്റർപ്രൈസ് സോഫ്റ്റ്‌വെയർ എന്നിവയിൽ ലോകോത്തര സേവനങ്ങൾ നൽകുന്ന പ്രമുഖ സ്ഥാപനം.')}
          </p>

          {/* Action CTAs */}
          <div className="hero-btn-cluster">
            <a href="/businesses" className="hero-primary-btn">
              <span>{lang === 'en' ? 'Explore Our Businesses' : 'ഞങ്ങളുടെ ബിസിനസുകൾ'}</span>
              <ArrowRight size={17} />
            </a>
            <a href="/contact" className="hero-secondary-btn">
              <span>{t.hero?.contactUs || (lang === 'en' ? 'Connect With Team' : 'ബന്ധപ്പെടുക')}</span>
            </a>
          </div>

          {/* Credibility Stats Bar */}
          <div className="hero-metrics-bar">
            <div className="metric-item">
              <span className="metric-val">{t.hero?.stats?.counts?.divisions || '8+'}</span>
              <span className="metric-lbl">{lang === 'en' ? 'Core Divisions' : 'ഡിവിഷനുകൾ'}</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-item">
              <span className="metric-val">{t.hero?.stats?.counts?.districts || '14'}</span>
              <span className="metric-lbl">{lang === 'en' ? 'Districts Covered' : 'ജില്ലകൾ'}</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-item">
              <span className="metric-val">{t.hero?.stats?.counts?.associates || '500+'}</span>
              <span className="metric-lbl">{lang === 'en' ? 'Active Partners' : 'പങ്കാളികൾ'}</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-item">
              <span className="metric-val">Global</span>
              <span className="metric-lbl">{lang === 'en' ? 'Standard & Vision' : 'നിലവാരം'}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Doorcarts Interest & Partnership Contact Form */}
        <div className="hero-right-col">
          <div className="hero-contact-card">
            <div className="hero-card-accent-bar" />

            {/* Card Header */}
            <div className="hero-card-header">
              <div className="hero-card-badge">
                <Sparkles size={13} className="hero-badge-icon" />
                <span>{lang === 'en' ? 'Doorcarts Partnership' : 'ഡോർകാർട്സ് പാർട്ണർഷിപ്പ്'}</span>
              </div>
              <h2 className="hero-card-title">
                {lang === 'en' ? 'Interested in Doorcarts?' : 'ഡോർകാർട്സിൽ താല്പര്യമുണ്ടോ?'}
              </h2>
              <p className="hero-card-subtitle">
                {lang === 'en'
                  ? 'Connect with our team to explore franchise, retail network, or partnership opportunities.'
                  : 'ഫ്രാഞ്ചൈസി, റീട്ടെയിൽ നെറ്റ്വർക്ക് അല്ലെങ്കിൽ പാർട്ണർഷിപ്പ് വിവരങ്ങൾക്ക് ഞങ്ങളുമായി ബന്ധപ്പെടുക.'}
              </p>
            </div>

            {isSubmitted ? (
              <div className="hero-form-success">
                <div className="success-icon-ring">
                  <CheckCircle2 size={36} color="#10B981" />
                </div>
                <h4>{lang === 'en' ? 'Enquiry Received!' : 'സന്ദേശം ലഭിച്ചു!'}</h4>
                <p>
                  {lang === 'en'
                    ? 'Thank you for your interest in Doorcarts. Our leadership team will review your details and reach out within 24 hours.'
                    : 'ഡോർകാർട്സിലുള്ള താങ്കളുടെ താല്പര്യത്തിന് നന്ദി. ഞങ്ങളുടെ ടീം ഉടൻ തന്നെ താങ്കളുമായി ബന്ധപ്പെടുന്നതാണ്.'}
                </p>
                <button
                  type="button"
                  className="hero-form-reset-btn"
                  onClick={() => setIsSubmitted(false)}
                >
                  {lang === 'en' ? 'Send Another Message' : 'മറ്റൊരു സന്ദേശം അയക്കുക'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="hero-lead-form" noValidate>
                {/* Anti-spam honeypot */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                  tabIndex="-1"
                  autoComplete="off"
                />

                {/* Name Field */}
                <div className="hero-input-group">
                  <label className="hero-field-label" htmlFor="hero-name">
                    {lang === 'en' ? 'Full Name' : 'പൂർണ്ണ നാമം'} <span className="req">*</span>
                  </label>
                  <div className="hero-input-wrapper">
                    <User size={15} className="hero-input-icon" />
                    <input
                      id="hero-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={lang === 'en' ? 'e.g. Rahul Sharma' : 'താങ്കളുടെ പേര്'}
                      required
                      className="hero-text-input"
                    />
                  </div>
                </div>

                {/* 2-Col: Phone & Email */}
                <div className="hero-inputs-row">
                  <div className="hero-input-group">
                    <label className="hero-field-label" htmlFor="hero-phone">
                      {lang === 'en' ? 'Phone Number' : 'ഫോൺ നമ്പർ'} <span className="req">*</span>
                    </label>
                    <div className="hero-input-wrapper">
                      <Phone size={15} className="hero-input-icon" />
                      <input
                        id="hero-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={lang === 'en' ? '+91 98765 43210' : '+91 98765 43210'}
                        required
                        className="hero-text-input"
                      />
                    </div>
                  </div>

                  <div className="hero-input-group">
                    <label className="hero-field-label" htmlFor="hero-email">
                      {lang === 'en' ? 'Email Address' : 'ഇമെയിൽ'} <span className="req">*</span>
                    </label>
                    <div className="hero-input-wrapper">
                      <Mail size={15} className="hero-input-icon" />
                      <input
                        id="hero-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={lang === 'en' ? 'name@company.com' : 'name@company.com'}
                        required
                        className="hero-text-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Message Field: Why interested in Doorcarts */}
                <div className="hero-input-group">
                  <label className="hero-field-label" htmlFor="hero-message">
                    {lang === 'en'
                      ? 'Why are you interested in Doorcarts?'
                      : 'ഡോർകാർട്സിൽ താങ്കൾക്കുള്ള താല്പര്യം എന്താണ്?'} <span className="req">*</span>
                  </label>
                  <div className="hero-input-wrapper textarea-wrapper">
                    <MessageSquare size={15} className="hero-input-icon textarea-icon" />
                    <textarea
                      id="hero-message"
                      name="message"
                      rows={2}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={lang === 'en'
                        ? 'e.g. Franchise ownership, retail partner, smart QR, supplier...'
                        : 'ഉദാ: ഫ്രാഞ്ചൈസി, റീട്ടെയിൽ പാർട്ണർ, സ്മാർട്ട് ക്യുആർ...'}
                      required
                      className="hero-text-input hero-textarea"
                    />
                  </div>
                </div>

                {/* Error message */}
                {errorMessage && (
                  <div className="hero-form-error">
                    {errorMessage}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="hero-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="btn-spin" />
                      <span>{lang === 'en' ? 'Sending Enquiry...' : 'അയക്കുന്നു...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{lang === 'en' ? 'Submit Doorcarts Enquiry' : 'അന്വേഷണം അയക്കുക'}</span>
                      <Send size={15} />
                    </>
                  )}
                </button>

                {/* Trust micro-caption */}
                <div className="hero-form-trust">
                  <span className="trust-dot" />
                  <span>{lang === 'en' ? 'Direct response within 24 hours • Confidential' : '24 മണിക്കൂറിനകം പ്രതികരണം • പൂർണ്ണ രഹസ്യസ്വഭാവം'}</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <a href="#about" className="hero-scroll-btn" aria-label="Scroll to About Us section">
        <ChevronDown size={22} />
      </a>
    </section>
  );
}
