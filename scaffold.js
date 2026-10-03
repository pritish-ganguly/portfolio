import fs from 'fs';
import path from 'path';

const sections = [
  'Hero',
  'CinematicVideo',
  'TheProblem',
  'WhatIBuild',
  'Websites',
  'Software',
  'Automation',
  'UIUX',
  'Commerce',
  'Intelligence',
  'Agents',
  'Infrastructure',
  'Systems',
  'Discovery',
  'TechnologyUniverse',
  'SelectedWork',
  'TechnicalProjects',
  'WhyMe',
  'Process',
  'Contact',
  'Footer'
];

const components = [
  'Navbar',
  'NotFound'
];

const srcDir = './src';
const sectionsDir = path.join(srcDir, 'sections');
const componentsDir = path.join(srcDir, 'components');

if (!fs.existsSync(sectionsDir)) fs.mkdirSync(sectionsDir, { recursive: true });
if (!fs.existsSync(componentsDir)) fs.mkdirSync(componentsDir, { recursive: true });

sections.forEach(sec => {
  const file = path.join(sectionsDir, `${sec}.jsx`);
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, `export const ${sec} = () => {\n  return (\n    <section className="section-padding">\n      <div className="container">\n        <span className="eyebrow">${sec}</span>\n        <h2 className="heading-2">Coming Soon</h2>\n      </div>\n    </section>\n  );\n};\n`);
  }
});

components.forEach(comp => {
  const file = path.join(componentsDir, `${comp}.jsx`);
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, `export const ${comp} = () => {\n  return <div>${comp}</div>;\n};\n`);
  }
});

console.log('Scaffold complete.');
