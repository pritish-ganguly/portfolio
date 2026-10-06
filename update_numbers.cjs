const fs = require('fs');
const path = require('path');

const sections = [
  { file: 'Industries.jsx', newId: '01' },
  { file: 'WhyMe.jsx', newId: '02' },
  { file: 'TheProblem.jsx', newId: '03' },
  { file: 'WhatIBuild.jsx', newId: '04' },
  { file: 'Websites.jsx', newId: '05' },
  { file: 'Software.jsx', newId: '06' },
  { file: 'Automation.jsx', newId: '07' },
  { file: 'UIUX.jsx', newId: '08' },
  { file: 'Commerce.jsx', newId: '09' },
  { file: 'Intelligence.jsx', newId: '10' },
  { file: 'Agents.jsx', newId: '11' },
  { file: 'Infrastructure.jsx', newId: '12' },
  { file: 'Systems.jsx', newId: '13' },
  { file: 'Discovery.jsx', newId: '14' },
  { file: 'TechnologyUniverse.jsx', newId: '15' },
  { file: 'SelectedWork.jsx', newId: '16' },
  { file: 'TechnicalProjects.jsx', newId: '17' },
  { file: 'Process.jsx', newId: '18' },
  { file: 'Contact.jsx', newId: '19' }
];

sections.forEach(sec => {
  const filepath = path.join(__dirname, 'src', 'sections', sec.file);
  if (fs.existsSync(filepath)) {
    let content = fs.readFileSync(filepath, 'utf-8');
    // More robust regex: matches `<span ...>XX / TEXT</span>`
    // We only want to replace the two digits.
    content = content.replace(/(<span[^>]*eyebrow[^>]*>)\d{2}( \/[^<]+<\/span>)/g, `$1${sec.newId}$2`);
    fs.writeFileSync(filepath, content);
    console.log(`Updated ${sec.file} to ${sec.newId}`);
  }
});
