"use client";
import { CheckCircle2 } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import './WhyChoose.css';
import useScrollReveal from '../utils/useScrollReveal';

const detailedWhyChoose = {
  en: [
    'End-to-end turnkey execution across electrical, plumbing, commercial solar EPC, water treatment, and smart building automation under one corporate roof.',
    'Direct manufacturer partnerships and authorized distribution of India’s leading BIS/ISO-certified electrical, sanitary, solar, and hardware brands.',
    'Dedicated project engineers, site supervisors, and certified installation teams ensuring strict safety compliance and on-schedule project handover.',
    'Comprehensive Annual Maintenance Contracts (AMC), preventive health checks, and rapid 24/7 breakdown support across all 14 districts of Kerala.',
    'Tailor-made engineering designs and scalable BOQs customized for residential villas, commercial complexes, hospitals, and industrial plants.',
    'A multidisciplinary workforce of experienced electrical engineers, solar EPC specialists, software architects, and trained field technicians.',
    'Factory-direct wholesale procurement and integrated supply chain logistics that deliver superior project value and transparent pricing.'
  ],
  ml: [
    'ഇലക്ട്രിക്കൽ, പ്ലംബിംഗ്, സോളാർ എനർജി, വാട്ടർ ട്രീറ്റ്‌മെന്റ്, സ്മാർട്ട് ഓട്ടോമേഷൻ തുടങ്ങി എല്ലാ എഞ്ചിനീയറിംഗ് സേവനങ്ങളും ഒരൊറ്റ കുടക്കീഴിൽ.',
    'ഇന്ത്യയിലെ മുൻനിര ബ്രാൻഡുകളുടെ അംഗീകൃത വിതരണവും 100% ഗുണനിലവാരമുള്ള ഒറിജിനൽ ഉൽപ്പന്നങ്ങളുടെ ഉറപ്പും.',
    'പരിചയസമ്പന്നരായ സൈറ്റ് എഞ്ചിനീയർമാരുടെയും സർട്ടിഫൈഡ് ടെക്നീഷ്യന്മാരുടെയും മേൽനോട്ടത്തിൽ സുരക്ഷിതവും കൃത്യസമയത്തുള്ളതുമായ ഇൻസ്റ്റലേഷൻ.',
    'കേരളത്തിലെ 14 ജില്ലകളിലും വേഗത്തിലുള്ള ആഫ്റ്റർ-സെയിൽസ് സർവീസും വാർഷിക പരിപാലന കരാറുകളും (AMC).',
    'വീടുകൾ, ഫ്ലാറ്റുകൾ, ഷോപ്പിംഗ് കോംപ്ലക്സുകൾ, ആശുപത്രികൾ, വ്യവസായ സ്ഥാപനങ്ങൾ എന്നിവയുടെ ആവശ്യത്തിനനുസരിച്ച് പ്രത്യേകം രൂപകൽപ്പന ചെയ്ത പ്രോജക്ടുകൾ.',
    'ഇലക്ട്രിക്കൽ, സോളാർ ഇപിസി, സോഫ്റ്റ്‌വെയർ, പ്രോജക്ട് മാനേജ്‌മെന്റ് മേഖലകളിൽ വർഷങ്ങളുടെ പരിചയസമ്പത്തുള്ള വിദഗ്ദ്ധ ടീം.',
    'നിർമ്മാതാക്കളിൽ നിന്നുള്ള നേരിട്ടുള്ള സംഭരണത്തിലൂടെ മികച്ച വിപണി വിലയും സുതാര്യമായ പ്രോജക്ട് എസ്റ്റിമേറ്റും.'
  ]
};

export default function WhyChoose({ lang, t }) {
  const { ref: scrollRef, className: scrollClass } = useScrollReveal();

  const getEnhancedDesc = (item, idx) => {
    const rawDesc = (item?.desc || '').trim();
    // If admin hasn't customized with a detailed sentence (> 60 chars), use rich corporate copy
    if (rawDesc.length < 60) {
      const list = detailedWhyChoose[lang] || detailedWhyChoose.en;
      return list[idx] || rawDesc;
    }
    return rawDesc;
  };

  return (
    <section id="why-choose" className={`section why-choose ${scrollClass}`} ref={scrollRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.whyChoose.label}</span>
          <h2 className="section-title">{t.whyChoose.title}</h2>
        </div>
        <div className="why-grid">
          <div className="why-visual">
            <div className="why-visual-circle why-vc-1" />
            <div className="why-visual-circle why-vc-2" />
            <div className="why-visual-circle why-vc-3" />
            <div className="why-visual-center">
              <span className="why-visual-logo">DOREK</span>
              <span className="why-visual-sub">Excellence in Every Solution</span>
            </div>
          </div>
          <div className="why-list">
            {t.whyChoose.items.map((item, i) => (
              <div key={i} className="why-item">
                <div className="why-item-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="why-item-content">
                  <h3>{item.title}</h3>
                  <p>{getEnhancedDesc(item, i)}</p>
                </div>
                <CheckCircle2 size={20} className="why-check" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

