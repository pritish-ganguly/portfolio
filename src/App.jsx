import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Preloader } from './components/Preloader';
import { Cursor } from './components/Cursor';
import { ScrollToTop } from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { CinematicVideo } from './sections/CinematicVideo';
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

function App() {
  const [siteLoaded, setSiteLoaded] = useState(false);

  // Check route for 404
  const path = window.location.pathname;
  if (path !== '/' && path !== '/index.html') {
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
        <WhyMe />
        <Process />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </ThemeProvider>
  );
}

export default App;
