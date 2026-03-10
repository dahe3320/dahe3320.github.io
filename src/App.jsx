import './App.css'
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import SocialSpeedDial from './components/SocialSpeedDial';
import Header from './components/Header'
import Hero from './components/Hero'
import BackgroundMesh from './components/BackgroundMesh';
import Gallery from './components/Gallery'
import Galleries from './components/Galleries';
import About from './components/About'
import Proficiency from './components/Proficiency'
import TechLogos from './components/TechLogos'
import Footer from './components/Footer'
import ScrollReveal from './components/ScrollReveal'
import ParallaxSection from './components/ParallaxSection';
import EasterEggs from './components/EasterEggs';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <BackgroundMesh />
      <CustomCursor />
      <ScrollProgress />
      <SocialSpeedDial />
      <EasterEggs />
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            {!loading && (
              <Routes>
                <Route path="/" element={<Hero />} />
              </Routes>
            )}

            {/* About — rises from depth with slight tilt */}
            <ParallaxSection speed={-0.08} zDepth={-80} rotateOnScroll={2}>
              <ScrollReveal variant="depth-rise" duration={1200} distance={80}>
                <About />
              </ScrollReveal>
            </ParallaxSection>

            {/* Proficiency — cinematic entrance with parallax */}
            <ParallaxSection speed={0.05} zDepth={-50} rotateOnScroll={1.5}>
              <ScrollReveal variant="cinematic" duration={1400} distance={60}>
                <Proficiency />
              </ScrollReveal>
            </ParallaxSection>

            {/* TechLogos — zoom from deep Z-space */}
            <ParallaxSection speed={-0.04} zDepth={-30}>
              <ScrollReveal variant="depth-zoom" duration={1000}>
                <TechLogos />
              </ScrollReveal>
            </ParallaxSection>

            {/* Gallery — flip in with depth */}
            <ParallaxSection speed={0.06} zDepth={-60} rotateOnScroll={1}>
              <ScrollReveal variant="depth-flip" duration={1300}>
                <Gallery />
              </ScrollReveal>
            </ParallaxSection>
          </>
        } />
        <Route path="/project/:id" element={<Galleries />} />
      </Routes>
      <ScrollReveal variant="fade-up" duration={600} threshold={0.05}>
        <Footer />
      </ScrollReveal>
    </>
  )
}

export default App;
