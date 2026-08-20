const fs = require('fs');
let content = fs.readFileSync('src/i18n/translations.js', 'utf8');

// Wipe all legal blocks
content = content.replace(/legal:\s*\{[\s\S]*?\},?\s*/g, '');

const enBlock = `    legal: {
      privacyPolicy: '<h2>Privacy Policy</h2><p>Dorek International values your privacy. This policy outlines how we collect, use, and protect your personal information.</p><h3>Information Collection</h3><p>We collect information you provide directly to us when you use our services.</p>',
      termsConditions: '<h2>Terms & Conditions</h2><p>By accessing our website and using our services, you agree to be bound by these terms. Please read them carefully.</p><h3>Use of Services</h3><p>You agree to use our services only for lawful purposes.</p>',
      refundPolicy: '<h2>Refund Policy</h2><p>Our refund policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately, we cannot offer you a refund or exchange.</p>',
      disclaimer: '<h2>Disclaimer</h2><p>The information provided on this website is for general informational purposes only. Dorek International makes no representations or warranties of any kind.</p>'
    },
`;

const mlBlock = `    legal: {
      privacyPolicy: '<h2>സ്വകാര്യതാ നയം (Privacy Policy)</h2><p>നിങ്ങളുടെ വിവരങ്ങളുടെ സുരക്ഷയ്ക്ക് Dorek International മുൻഗണന നൽകുന്നു. ഞങ്ങൾ വിവരങ്ങൾ എങ്ങനെ ശേഖരിക്കുകയും ഉപയോഗിക്കുകയും ചെയ്യുന്നു എന്ന് ഇവിടെ വിശദീകരിക്കുന്നു.</p>',
      termsConditions: '<h2>നിബന്ധനകളും വ്യവസ്ഥകളും (Terms & Conditions)</h2><p>ഞങ്ങളുടെ സേവനങ്ങൾ ഉപയോഗിക്കുന്നതിലൂടെ, ഈ വെബ്സൈറ്റിലെ നിബന്ധനകൾ നിങ്ങൾ അംഗീകരിക്കുന്നു.</p>',
      refundPolicy: '<h2>റീഫണ്ട് നയം (Refund Policy)</h2><p>ഞങ്ങളുടെ സേവനങ്ങൾക്ക് 30 ദിവസത്തെ റീഫണ്ട് പോളിസി ബാധകമാണ്.</p>',
      disclaimer: '<h2>നിരാകരണം (Disclaimer)</h2><p>ഈ വെബ്സൈറ്റിൽ നൽകിയിട്ടുള്ള വിവരങ്ങൾ പൊതുവായ ആവശ്യങ്ങൾക്ക് മാത്രമുള്ളതാണ്.</p>'
    },
`;

// Insert EN block before the FIRST 'portal: {'
content = content.replace('    portal: {', enBlock + '    portal: {');

// The first replace leaves the SECOND 'portal: {' unchanged.
// We need to replace the SECOND 'portal: {'. Since replace() only matches the first,
// we can do a reverse or manual match, but simple way is to use a replacer function.

let count = 0;
content = content.replace(/    portal: \{/g, (match) => {
  count++;
  if (count === 2) {
    return mlBlock + match;
  }
  return match;
});

fs.writeFileSync('src/i18n/translations.js', content);
