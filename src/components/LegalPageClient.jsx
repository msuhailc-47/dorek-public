'use client';
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { CMSProvider, useCMS } from '../context/CMSContext';
import translations from '../i18n/translations';

const enterpriseLegalPolicies = {
  en: {
    privacyPolicy: `
      <h3>1. Introduction & Corporate Commitment</h3>
      <p>Dorek International Enterprises LLP ("Dorek International", "we", "our", or "us") respects your privacy and is committed to protecting the personal and business information you share with us across our website (<strong>dorekinternational.in</strong>), retail outlets, Doorcarts franchise network, and enterprise software platforms.</p>
      <h3>2. Information We Collect</h3>
      <p>We collect information that you voluntarily provide when submitting business enquiries, franchise/dealership applications, career applications, or service requests, including:</p>
      <ul>
        <li>Full Name, Designation, and Company/Store Name</li>
        <li>Contact Details (Phone Number, WhatsApp Number, Email Address, and Postal Address)</li>
        <li>Project Requirements, Franchise Territory Preferences, or Resume/Qualification Details</li>
        <li>Standard technical telemetry (browser type, device type, and anonymized session analytics) to optimize site performance and security.</li>
      </ul>
      <h3>3. How We Use Your Information</h3>
      <p>Your information is strictly used for legitimate corporate operations, including:</p>
      <ul>
        <li>Responding to your product, engineering, solar EPC, or franchise partnership enquiries within 24–48 business hours.</li>
        <li>Evaluating dealership, associate, investor, and career applications.</li>
        <li>Providing installation support, Annual Maintenance Contract (AMC) scheduling, and warranty assistance.</li>
      </ul>
      <h3>4. Data Protection & Confidentiality</h3>
      <p>We implement strict administrative and technical safeguards to protect your data against unauthorized access. Dorek International does <strong>not</strong> sell, rent, or trade your personal contact details to third-party marketers.</p>
      <h3>5. Contact & Grievance Redressal</h3>
      <p>For any privacy-related queries, data updates, or grievance redressal, please contact our Corporate Desk via the official Contact page on this website.</p>
    `,
    termsConditions: `
      <h3>1. Acceptance of Terms</h3>
      <p>By accessing and using the official website of <strong>Dorek International Enterprises LLP</strong> (dorekinternational.in), you agree to comply with and be bound by these Terms and Conditions and all applicable laws and regulations in India.</p>
      <h3>2. Scope of Services & Business Divisions</h3>
      <p>Dorek International operates across multiple divisions including Doorcarts Retail & Wholesale, Doorcarts My Store Franchises, Engineering & Solar EPC Services, Annual Maintenance Contracts (AMC), Technical Training, and Enterprise Software Solutions. Specific commercial engagements, dealership appointments, and EPC contracts are governed by formal written agreements executed between the respective parties.</p>
      <h3>3. Intellectual Property Rights</h3>
      <p>All brand names, logos (including <strong>Dorek International</strong> and <strong>Doorcarts</strong>), software architectures, graphics, and documentation displayed on this website are the intellectual property of Dorek International Enterprises LLP. Unauthorized reproduction or commercial misuse is strictly prohibited.</p>
      <h3>4. Accuracy of Information</h3>
      <p>While we strive to keep product specifications, network statistics, and business opportunity details accurate and up to date, all technical specifications and commercial terms are subject to formal quotation and verification by our corporate office.</p>
      <h3>5. Governing Law & Jurisdiction</h3>
      <p>These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with this website shall be subject to the exclusive jurisdiction of the courts in Kerala, India.</p>
    `,
    refundPolicy: `
      <h3>1. General Policy Overview</h3>
      <p>Dorek International Enterprises LLP is committed to transparent commercial practices and customer satisfaction across all product sales, engineering installations, and software subscriptions.</p>
      <h3>2. Retail & Wholesale Products (Doorcarts)</h3>
      <ul>
        <li><strong>Eligibility:</strong> Unused, undamaged electrical, plumbing, solar, or hardware products in their original manufacturer packaging with a valid tax invoice may be eligible for replacement or return within <strong>7 to 30 days</strong> of purchase, subject to category-specific warranty rules.</li>
        <li><strong>Manufacturing Defects:</strong> Products covered under manufacturer warranty will be repaired or replaced as per the respective brand's authorized warranty policy.</li>
      </ul>
      <h3>3. Turnkey Engineering, Solar EPC & Custom Software</h3>
      <p>For customized engineering projects, solar EPC installations, and bespoke ERP/CRM software deployments, milestone payments and cancellation terms are governed by the signed Project Work Order or Service Level Agreement (SLA).</p>
      <h3>4. Refund Processing Timeline</h3>
      <p>Approved refunds are processed via the original mode of payment (Bank Transfer / NEFT / UPI) within <strong>7–10 business days</strong> after quality inspection and approval by the Accounts Department.</p>
    `,
    disclaimer: `
      <h3>1. Corporate & Informational Disclaimer</h3>
      <p>The information contained on <strong>dorekinternational.in</strong> is provided by Dorek International Enterprises LLP for general corporate informational purposes. While every effort is made to ensure accuracy, completeness, and timeliness, we make no warranties, express or implied, regarding the completeness or suitability of the information for any specific purpose.</p>
      <h3>2. Franchise & Investment Projections</h3>
      <p>Any references to franchise growth, dealership margins, district coverage, or investor returns are indicative of corporate targets and historical operational models. Actual business performance depends on territory dynamics, operational execution, and market conditions. Prospective partners and investors are encouraged to review formal legal agreements and conduct independent due diligence through our Corporate Office.</p>
      <h3>3. Third-Party Brand Trademarks</h3>
      <p>References to third-party electrical, plumbing, solar, or hardware brands distributed through our retail and wholesale network belong to their respective trademark owners.</p>
    `
  },
  ml: {
    privacyPolicy: `
      <h3>1. ആമുഖം</h3>
      <p>ഡോറെക് ഇന്റർനാഷണൽ എന്റർപ്രൈസസ് എൽഎൽപി (Dorek International Enterprises LLP) ഉപഭോക്താക്കളുടെയും ബിസിനസ് പങ്കാളികളുടെയും സ്വകാര്യതയ്ക്ക് പരമോന്നത പ്രാധാന്യം നൽകുന്നു. ഞങ്ങളുടെ വെബ്സൈറ്റ്, ഡോർകാർട്ട്സ് സ്റ്റോറുകൾ, സോഫ്റ്റ്‌വെയർ പ്ലാറ്റ്‌ഫോമുകൾ എന്നിവയിലൂടെ നിങ്ങൾ നൽകുന്ന വിവരങ്ങൾ എങ്ങനെ സുരക്ഷിതമായി സൂക്ഷിക്കുന്നു എന്ന് ഈ നയം വ്യക്തമാക്കുന്നു.</p>
      <h3>2. ഞങ്ങൾ ശേഖരിക്കുന്ന വിവരങ്ങൾ</h3>
      <p>ബിസിനസ് അന്വേഷണങ്ങൾ, ഫ്രാഞ്ചൈസി/ഡീലർഷിപ്പ് അപേക്ഷകൾ, ജോലി അപേക്ഷകൾ എന്നിവ സമർപ്പിക്കുമ്പോൾ നിങ്ങൾ സ്വമേധയാ നൽകുന്ന പേര്, ഫോൺ നമ്പർ, ഇമെയിൽ വിലാസം, സ്ഥലം, പ്രോജക്ട് വിവരങ്ങൾ എന്നിവ മാത്രമാണ് ഞങ്ങൾ ശേഖരിക്കുന്നത്.</p>
      <h3>3. വിവരങ്ങളുടെ ഉപയോഗം</h3>
      <p>നിങ്ങളുടെ അന്വേഷണങ്ങൾക്ക് മറുപടി നൽകുന്നതിനും, സോളാർ/എഞ്ചിനീയറിംഗ് പ്രോജക്ട് സേവനങ്ങൾ ലഭ്യമാക്കുന്നതിനും, ഫ്രാഞ്ചൈസി/കരിയർ അപേക്ഷകൾ പരിശോധിക്കുന്നതിനും മാത്രമായി ഈ വിവരങ്ങൾ ഉപയോഗിക്കുന്നു. ഉപഭോക്താക്കളുടെ വിവരങ്ങൾ യാതൊരു കാരണവശാലും മറ്റ് മൂന്നാം കക്ഷികൾക്ക് കൈമാറുന്നതല്ല.</p>
    `,
    termsConditions: `
      <h3>1. നിബന്ധനകളുടെ അംഗീകാരം</h3>
      <p>ഡോറെക് ഇന്റർനാഷണൽ എന്റർപ്രൈസസ് എൽഎൽപിയുടെ ഔദ്യോഗിക വെബ്സൈറ്റ് ഉപയോഗിക്കുന്നതിലൂടെ കമ്പനിയുടെ നിബന്ധനകളും വ്യവസ്ഥകളും നിങ്ങൾ അംഗീകരിക്കുന്നു.</p>
      <h3>2. സേവനങ്ങളും ബിസിനസ് കരാറുകളും</h3>
      <p>ഡോർകാർട്ട്സ് റീട്ടെയ്ൽ, ഫ്രാഞ്ചൈസി, സോളാർ ഇപിസി, എഎംസി (AMC), സോഫ്റ്റ്‌വെയർ സേവനങ്ങൾ എന്നിവയുമായി ബന്ധപ്പെട്ട വാണിജ്യ ഇടപാടുകൾ കമ്പനിയും ബന്ധപ്പെട്ട കക്ഷികളും തമ്മിൽ ഒപ്പുവെക്കുന്ന ഔദ്യോഗിക രേഖകൾക്ക് വിധേയമായിരിക്കും.</p>
      <h3>3. ബൗദ്ധിക സ്വത്തവകാശം</h3>
      <p>ഈ വെബ്സൈറ്റിലെ Dorek International, Doorcarts എന്നീ ബ്രാൻഡ് നാമങ്ങളും ലോഗോകളും ഉള്ളടക്കവും കമ്പനിയുടെ സ്വന്തം സ്വത്താണ്. അനുമതിയില്ലാതെ ഇവ പകർത്തുന്നത് നിയമവിരുദ്ധമാണ്.</p>
    `,
    refundPolicy: `
      <h3>1. റീഫണ്ട് & റിട്ടേൺ നയം</h3>
      <p>ഡോർകാർട്ട്സ് വഴി വാങ്ങുന്ന ഉൽപ്പന്നങ്ങൾക്ക് ഒറിജിനൽ ബില്ലും പാക്കിംഗും സഹിതം നിശ്ചിത ദിവസത്തിനുള്ളിൽ (7–30 ദിവസങ്ങൾക്കുള്ളിൽ, ഉൽപ്പന്ന വിഭാഗത്തിനനുസരിച്ച്) മാറ്റിയെടുക്കാനോ വാറന്റി സേവനങ്ങൾക്കോ അർഹതയുണ്ടായിരിക്കും.</p>
      <h3>2. പ്രോജക്ടുകളും സർവീസുകളും</h3>
      <p>സോളാർ ഇപിസി, എഞ്ചിനീയറിംഗ് ഇൻസ്റ്റലേഷൻ, കസ്റ്റം സോഫ്റ്റ്‌വെയർ പ്രോജക്ടുകൾ എന്നിവയുടെ പേയ്‌മെന്റും റീഫണ്ട് നിബന്ധനകളും പ്രോജക്ട് കരാർ (Work Order / SLA) പ്രകാരമായിരിക്കും. അംഗീകരിക്കപ്പെട്ട റീഫണ്ടുകൾ 7–10 പ്രവൃത്തി ദിവസങ്ങൾക്കുള്ളിൽ ബാങ്ക് അക്കൗണ്ട് വഴി തിരികെ നൽകുന്നതാണ്.</p>
    `,
    disclaimer: `
      <h3>1. പൊതു നിരാകരണം (Disclaimer)</h3>
      <p>ഈ വെബ്സൈറ്റിൽ നൽകിയിട്ടുള്ള വിവരങ്ങൾ കമ്പനിയുടെ സേവനങ്ങളെയും ബിസിനസ് അവസരങ്ങളെയും കുറിച്ച് പൊതുവായ ധാരണ നൽകുന്നതിന് വേണ്ടിയുള്ളതാണ്. ഫ്രാഞ്ചൈസി, ഡീലർഷിപ്പ്, നിക്ഷേപം എന്നിവയിൽ താല്പര്യമുള്ളവർ കമ്പനി ഓഫീസുമായി നേരിട്ട് ബന്ധപ്പെട്ട് ഔദ്യോഗിക വിവരങ്ങളും കരാറുകളും പരിശോധിച്ച് ഉറപ്പുവരുത്തേണ്ടതാണ്.</p>
    `
  }
};

function LegalPageInner({ pageKey, pageTitle }) {
  const { t, lang, setLang } = useCMS();
  
  const cmsText = t?.legal?.[pageKey] || '';
  const fallbackPolicy = enterpriseLegalPolicies?.[lang]?.[pageKey] || enterpriseLegalPolicies?.en?.[pageKey];
  // If CMS only has the 2-sentence initial placeholder (< 350 chars), render the complete enterprise policy
  const htmlContent = (cmsText && cmsText.length > 350)
    ? cmsText
    : (fallbackPolicy || translations?.[lang]?.legal?.[pageKey] || '<p>Policy information available upon request.</p>');

  return (
    <div className='legal-page'>
      <Navbar minimal={true} lang={lang} t={t} onLangChange={() => setLang(lang === 'en' ? 'ml' : 'en')} />
      
      <main className='legal-content container' style={{ paddingTop: '110px', paddingBottom: '80px', minHeight: '80vh' }}>
        <div style={{ maxWidth: '900px' }}>
          <h1 style={{ color: 'var(--primary)', marginBottom: '30px', fontSize: '2.5rem' }}>{pageTitle}</h1>
          <div 
            className='legal-text' 
            style={{ lineHeight: '1.8', color: 'var(--text-muted)' }}
            dangerouslySetInnerHTML={{ __html: htmlContent }} 
          />
        </div>
      </main>

      <Footer lang={lang} t={t} />
    </div>
  );
}

export default function LegalPageClient({ initialData, pageKey, pageTitle }) {
  if (!initialData) return <div>Loading...</div>;
  return (
    <CMSProvider initialData={initialData}>
      <LegalPageInner pageKey={pageKey} pageTitle={pageTitle} />
    </CMSProvider>
  );
}
