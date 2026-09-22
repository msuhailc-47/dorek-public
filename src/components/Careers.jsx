"use client";
import { useState, useRef } from 'react';
import { useCMS } from '../context/CMSContext';
import { Briefcase, Clock, MapPin, GraduationCap, Award, ArrowRight, X, CheckCircle2, Loader2, Send } from 'lucide-react';
import './Careers.css';
import useScrollReveal from '../utils/useScrollReveal';

export default function Careers({ lang, t }) {
  const { ref: scrollRef, className: scrollClass } = useScrollReveal();
  const { addSubmission, themeSettings } = useCMS();
  const [tab, setTab] = useState(0);

  // Application Modal State
  const [applyTarget, setApplyTarget] = useState(null); // { title, dept, type }
  const [applicant, setApplicant] = useState({ name: '', phone: '', email: '', experience: '', link: '', honeypot: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const isSubmittingRef = useRef(false);

  const jobs = t.careers.jobs || [];
  const internships = t.careers.internships || [];
  const training = t.careers.training || [];

  const handleOpenModal = (title, dept, type) => {
    setApplyTarget({ title, dept, type });
    setApplicant({ name: '', phone: '', email: '', experience: '', link: '', honeypot: '' });
    setIsSubmitted(false);
    setErrorMsg('');
  };

  const handleCloseModal = () => {
    setApplyTarget(null);
    setIsSubmitted(false);
    setErrorMsg('');
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (isSubmittingRef.current || isSubmitting) return;

    if (applicant.honeypot !== '') {
      setIsSubmitted(true);
      return;
    }

    const cleanName = (applicant.name || '').trim();
    const cleanPhone = (applicant.phone || '').trim();
    const cleanEmail = (applicant.email || '').trim();
    const cleanExp = (applicant.experience || '').trim();
    const cleanLink = (applicant.link || '').trim();

    if (!cleanName || !cleanPhone || !cleanEmail || !cleanExp) {
      setErrorMsg(lang === 'en' ? 'Please fill in all required fields.' : 'ദയവായി ആവശ്യമായ എല്ലാ വിവരങ്ങളും നൽകുക.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMsg(lang === 'en' ? 'Please enter a valid email address.' : 'ശരിയായ ഇമെയിൽ നൽകുക.');
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const roleTitle = applyTarget?.title || 'Open Position';
      const roleDept = applyTarget?.dept || 'General';

      const submissionData = {
        name: cleanName,
        phone: cleanPhone,
        email: cleanEmail,
        subject: `Job Application: ${roleTitle} (${roleDept})`,
        message: `Applied Role: ${roleTitle}\nDepartment: ${roleDept}\nExperience / Qualification:\n${cleanExp}\nPortfolio / Resume Link: ${cleanLink || 'Not provided'}`,
        source: `Careers Portal - ${roleTitle}`
      };

      // 1. Dispatch background email notification
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          phone: cleanPhone,
          email: cleanEmail,
          subject: `New Job Application: ${roleTitle} (${roleDept})`,
          message: submissionData.message,
          adminEmail: themeSettings?.adminEmail
        })
      }).catch(err => console.warn('Careers email notify error:', err));

      // 2. Save directly to Firestore for Admin Dashboard
      if (typeof addSubmission === 'function') {
        await Promise.race([
          addSubmission(submissionData),
          new Promise(res => setTimeout(res, 2000))
        ]);
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('Career submit error:', err);
      setErrorMsg(lang === 'en' ? 'An error occurred. Please try again.' : 'ഒരു തകരാർ സംഭവിച്ചു. വീണ്ടും ശ്രമിക്കുക.');
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <section id="careers" className={`section careers ${scrollClass}`} ref={scrollRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.careers.label}</span>
          <h2 className="section-title">{t.careers.title}</h2>
          <p className="section-subtitle">{t.careers.subtitle}</p>
        </div>

        <div className="career-tabs">
          {t.careers.categories.map((cat, i) => (
            <button key={i} className={`career-tab ${tab === i ? 'career-tab-active' : ''}`} onClick={() => setTab(i)}>
              {cat}
            </button>
          ))}
        </div>

        <div className="career-content">
          {tab === 0 && (
            <div className="career-list">
              {jobs.map((j, i) => (
                <div key={i} className="career-card">
                  <div className="career-card-left">
                    <h4><Briefcase size={16} /> {j.title}</h4>
                    <div className="career-meta">
                      <span><MapPin size={13} /> {j.location}</span>
                      <span><Clock size={13} /> {j.type}</span>
                    </div>
                  </div>
                  <div className="career-card-right">
                    <span className="badge badge-emerald">{j.dept}</span>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handleOpenModal(j.title, j.dept, 'job')}
                    >
                      {t.careers.apply} <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 1 && (
            <div className="career-list">
              {internships.map((j, i) => (
                <div key={i} className="career-card">
                  <div className="career-card-left">
                    <h4><GraduationCap size={16} /> {j.title}</h4>
                    <div className="career-meta">
                      <span><Clock size={13} /> {j.duration}</span>
                    </div>
                  </div>
                  <div className="career-card-right">
                    <span className="badge">{j.dept}</span>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handleOpenModal(j.title, j.dept, 'internship')}
                    >
                      {t.careers.apply} <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 2 && (
            <div className="career-list">
              {training.map((j, i) => (
                <div key={i} className="career-card">
                  <div className="career-card-left">
                    <h4><Award size={16} /> {j.title}</h4>
                    <p className="career-training-desc">{j.desc}</p>
                  </div>
                  <div className="career-card-right">
                    {j.cert && <span className="badge badge-gold">{t.careers.certified}</span>}
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handleOpenModal(j.title, 'Certified Training', 'training')}
                    >
                      {t.careers.enroll} <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <button 
            className="btn btn-primary btn-lg"
            onClick={() => handleOpenModal('General Application', 'All Divisions', 'general')}
          >
            {t.careers.applyOnline} <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Interactive Application Modal */}
      {applyTarget && (
        <div className="career-modal-overlay" onClick={handleCloseModal}>
          <div className="career-modal" onClick={e => e.stopPropagation()}>
            <button className="career-modal-close" onClick={handleCloseModal} aria-label="Close modal">
              <X size={20} />
            </button>

            {!isSubmitted ? (
              <>
                <div className="career-modal-header">
                  <span className="career-modal-badge">{applyTarget.dept}</span>
                  <h3>
                    {applyTarget.type === 'training' 
                      ? (lang === 'en' ? `Enroll: ${applyTarget.title}` : `എൻറോൾ ചെയ്യുക: ${applyTarget.title}`)
                      : (lang === 'en' ? `Apply: ${applyTarget.title}` : `അപേക്ഷിക്കുക: ${applyTarget.title}`)}
                  </h3>
                  <p>
                    {lang === 'en' 
                      ? 'Submit your profile to our talent acquisition desk. Shortlisted candidates will be contacted directly.' 
                      : 'നിങ്ങളുടെ വിവരങ്ങൾ സമർപ്പിക്കുക. തിരഞ്ഞെടുക്കപ്പെടുന്നവരുമായി ഉടൻ ബന്ധപ്പെടുന്നതാണ്.'}
                  </p>
                </div>

                {errorMsg && <div className="career-modal-error">{errorMsg}</div>}

                <form className="career-modal-form" onSubmit={handleApplySubmit}>
                  {/* Honeypot spam trap */}
                  <div style={{ display: 'none' }} aria-hidden="true">
                    <input 
                      type="text" 
                      name="honeypot" 
                      value={applicant.honeypot} 
                      onChange={e => setApplicant(p => ({ ...p, honeypot: e.target.value }))} 
                      tabIndex={-1} 
                      autoComplete="off" 
                    />
                  </div>

                  <div className="career-form-row">
                    <div className="career-form-group">
                      <label>{lang === 'en' ? 'Full Name *' : 'പൂർണ്ണ നാമം *'}</label>
                      <input 
                        type="text" 
                        required 
                        placeholder={lang === 'en' ? 'e.g. Rahul Menon' : 'പേര് നൽകുക'} 
                        value={applicant.name} 
                        onChange={e => setApplicant(p => ({ ...p, name: e.target.value }))} 
                      />
                    </div>
                    <div className="career-form-group">
                      <label>{lang === 'en' ? 'Phone Number *' : 'ഫോൺ നമ്പർ *'}</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="+91 98765 43210" 
                        value={applicant.phone} 
                        onChange={e => setApplicant(p => ({ ...p, phone: e.target.value }))} 
                      />
                    </div>
                  </div>

                  <div className="career-form-group">
                    <label>{lang === 'en' ? 'Email Address *' : 'ഇമെയിൽ വിലാസം *'}</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="name@example.com" 
                      value={applicant.email} 
                      onChange={e => setApplicant(p => ({ ...p, email: e.target.value }))} 
                    />
                  </div>

                  <div className="career-form-group">
                    <label>{lang === 'en' ? 'Experience / Qualification Summary *' : 'പരിചയം / യോഗ്യത സംഗ്രഹം *'}</label>
                    <textarea 
                      rows={3} 
                      required 
                      placeholder={lang === 'en' ? 'Mention your highest education, relevant skills, or prior roles...' : 'വിദ്യാഭ്യാസ യോഗ്യതയും മുൻപരിചയവും വ്യക്തമാക്കുക...'} 
                      value={applicant.experience} 
                      onChange={e => setApplicant(p => ({ ...p, experience: e.target.value }))} 
                    />
                  </div>

                  <div className="career-form-group">
                    <label>{lang === 'en' ? 'Resume / LinkedIn / Portfolio URL (Optional)' : 'റെസ്യുമെ / ലിങ്ക്ഡ്ഇൻ ലിങ്ക് (ഓപ്ഷണൽ)'}</label>
                    <input 
                      type="url" 
                      placeholder="https://drive.google.com/... or linkedin.com/in/..." 
                      value={applicant.link} 
                      onChange={e => setApplicant(p => ({ ...p, link: e.target.value }))} 
                    />
                  </div>

                  <button type="submit" className="btn btn-primary career-submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="career-spinner" />
                        <span>{lang === 'en' ? 'Submitting Application...' : 'സമർപ്പിക്കുന്നു...'}</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>{applyTarget.type === 'training' ? (lang === 'en' ? 'Confirm Enrollment' : 'എൻറോൾമെന്റ് ഉറപ്പാക്കുക') : (lang === 'en' ? 'Submit Application' : 'അപേക്ഷ സമർപ്പിക്കുക')}</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="career-modal-success animate-fadeIn">
                <CheckCircle2 size={54} className="career-success-icon" />
                <h3>{lang === 'en' ? 'Application Received!' : 'അപേക്ഷ വിജയകരമായി ലഭിച്ചു!'}</h3>
                <p>
                  {lang === 'en' 
                    ? `Thank you for your interest in ${applyTarget.title}. Our HR department has received your profile and will contact you via phone or email.` 
                    : `${applyTarget.title} സ്ഥാനത്തേക്കുള്ള നിങ്ങളുടെ അപേക്ഷ ലഭിച്ചു. എച്ച്ആർ ടീം ഉടൻ തന്നെ നിങ്ങളുമായി ബന്ധപ്പെടുന്നതാണ്.`}
                </p>
                <button className="btn btn-primary" onClick={handleCloseModal}>
                  {lang === 'en' ? 'Close Window' : 'വിൻഡോ ക്ലോസ് ചെയ്യുക'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

