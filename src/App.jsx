import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThemeProvider } from './context/ThemeContext';
import { Preloader } from './components/Preloader';
import { Cursor } from './components/Cursor';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { CinematicVideo } from './sections/CinematicVideo';
import { Industries } from './sections/Industries';
import { TheProblem } from './sections/TheProblem';
import { WhatIBuild } from './sections/WhatIBuild';
import { Websites } from './sections/Websites';
import { Software } from './sections/Software';
import { Automation } from './sections/Automation';
import { UIUX } from './sections/UIUX';
import { Commerce } from './sections/Commerce';
import { Intelligence } from './sections/Intelligence';
import { Agents } from './sections/Agents';
import { Infrastructure } from './sections/Infrastructure';
import { Systems } from './sections/Systems';
import { Discovery } from './sections/Discovery';
import { TechnologyUniverse } from './sections/TechnologyUniverse';
import { SelectedWork } from './sections/SelectedWork';
import { TechnicalProjects } from './sections/TechnicalProjects';
import { WhyMe } from './sections/WhyMe';
import { Process } from './sections/Process';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { NotFound } from './components/NotFound';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [siteLoaded, setSiteLoaded] = useState(false);

  useEffect(() => {
    // CRITICAL BUG FIX: Mobile scroll jitter / pinning jumps
    // Prevents ScrollTrigger from recalculating pins when mobile address bar shows/hides
    ScrollTrigger.config({ ignoreMobileResize: true });
    
    // Optional: Refresh safely when a true orientation change happens
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        ScrollTrigger.refresh();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check route for 404 - naive check for GitHub Pages compatibility
  const path = window.location.pathname;
  const isBaseOrRoot = path === '/' || path === '/index.html' || path === '/portfolio' || path === '/portfolio/';
  if (!isBaseOrRoot) {
    return (
      <ThemeProvider>
        <NotFound />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <Cursor />
      <Preloader onComplete={() => setSiteLoaded(true)} />
      <Navbar show={siteLoaded} />
      <main>
        <Hero isLoaded={siteLoaded} />
        <CinematicVideo />
        <Industries />
        <WhyMe />
        <TheProblem />
        <WhatIBuild />
        <Websites />
        <Software />
        <Automation />
        <UIUX />
        <Commerce />
        <Intelligence />
        <Agents />
        <Infrastructure />
        <Systems />
        <Discovery />
        <TechnologyUniverse />
        <SelectedWork />
        <TechnicalProjects />
        <Process />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
