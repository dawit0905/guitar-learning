import { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import MainNav from './components/MainNav';
import Roadmap from './components/Roadmap';
import ScaleSelector from './components/ScaleSelector';
import KeySelector from './components/KeySelector';
import Fretboard from './components/Fretboard';
import ScaleInfo from './components/ScaleInfo';
import Legend from './components/Legend';
import PracticeTips from './components/PracticeTips';
import Footer from './components/Footer';
import TriadSection from './components/TriadSection';
import DoubleStopSection from './components/DoubleStopSection';
import ChordSection from './components/ChordSection';
import ModeSection from './components/ModeSection';
import ScaleTheory from './components/ScaleTheory';
import LicksPage from './components/LicksPage';
import LickDetail from './components/LickDetail';
import { SCALE_DEFINITIONS } from './data/scales';
import { licks } from './data/licks';

const SECTION_TO_PATH = {
  scales: '/',
  modes: '/modes',
  triads: '/triads',
  doublestops: '/doublestops',
  chords: '/chords',
  licks: '/licks',
};

const PATH_TO_SECTION = Object.entries(SECTION_TO_PATH).reduce((acc, [section, path]) => {
  acc[path] = section;
  return acc;
}, {});

function normalizePath(pathname) {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed || '/';
}

function parseRoute(pathname) {
  const path = normalizePath(pathname);

  if (path.startsWith('/licks/')) {
    const idPart = path.split('/')[2];
    const lickId = Number(idPart);
    const lick = Number.isFinite(lickId) ? licks.find((item) => item.id === lickId) : null;
    return { section: 'licks', lick: lick || null, isDetail: Boolean(lick) };
  }

  const section = PATH_TO_SECTION[path] || 'scales';
  return { section, lick: null, isDetail: false };
}

function App() {
  const [activeSection, setActiveSection] = useState('scales');
  const [currentScale, setCurrentScale] = useState('minor-pentatonic');
  const [currentKey, setCurrentKey] = useState('A');
  const [showNotes, setShowNotes] = useState(true);
  const [showIntervals, setShowIntervals] = useState(false);
  const [selectedLick, setSelectedLick] = useState(null);

  const handleStageClick = useCallback((stage) => {
    const scaleInStage = Object.entries(SCALE_DEFINITIONS)
      .find(([name, def]) => def.stage === stage);

    if (scaleInStage) {
      setCurrentScale(scaleInStage[0]);
    }
  }, []);

  const syncFromLocation = useCallback(() => {
    const pathname = window.location.pathname;
    const { section, lick } = parseRoute(pathname);
    if (section === 'licks' && pathname.startsWith('/licks/') && !lick) {
      window.history.replaceState({}, '', '/licks');
    }
    setActiveSection(section);
    setSelectedLick(lick);
  }, []);

  const pushPath = useCallback((path) => {
    const nextPath = normalizePath(path);
    const currentPath = normalizePath(window.location.pathname);
    if (nextPath === currentPath) return;
    window.history.pushState({}, '', nextPath);
  }, []);

  const handleSectionChange = useCallback((section) => {
    setActiveSection(section);
    setSelectedLick(null);
    const path = SECTION_TO_PATH[section] || '/';
    pushPath(path);
  }, [pushPath]);

  const handleLickSelect = useCallback((lick) => {
    setActiveSection('licks');
    setSelectedLick(lick);
    pushPath(`/licks/${lick.id}`);
  }, [pushPath]);

  const handleLickBack = useCallback(() => {
    setSelectedLick(null);
    pushPath('/licks');
  }, [pushPath]);

  useEffect(() => {
    syncFromLocation();
    window.addEventListener('popstate', syncFromLocation);
    return () => window.removeEventListener('popstate', syncFromLocation);
  }, [syncFromLocation]);

  const renderSection = () => {
    switch (activeSection) {
      case 'scales':
        return (
          <>
            <Roadmap
              currentScale={currentScale}
              onStageClick={handleStageClick}
            />
            <ScaleSelector
              currentScale={currentScale}
              onScaleChange={setCurrentScale}
            />
            <KeySelector
              currentKey={currentKey}
              onKeyChange={setCurrentKey}
            />
            <Fretboard
              currentScale={currentScale}
              currentKey={currentKey}
              showNotes={showNotes}
              showIntervals={showIntervals}
              onToggleNotes={setShowNotes}
              onToggleIntervals={setShowIntervals}
            />
            <ScaleInfo
              currentScale={currentScale}
              currentKey={currentKey}
            />
            <ScaleTheory
              currentScale={currentScale}
            />
            <Legend />
            <PracticeTips />
          </>
        );
      case 'modes':
        return (
          <ModeSection
            currentMode={currentScale}
            setCurrentMode={setCurrentScale}
            currentKey={currentKey}
            setCurrentKey={setCurrentKey}
            showNotes={showNotes}
            setShowNotes={setShowNotes}
            showIntervals={showIntervals}
            setShowIntervals={setShowIntervals}
          />
        );
      case 'triads':
        return <TriadSection />;
      case 'doublestops':
        return <DoubleStopSection />;
      case 'chords':
        return <ChordSection />;
      case 'licks':
        return selectedLick ? (
          <LickDetail
            lick={selectedLick}
            onBack={handleLickBack}
          />
        ) : (
          <LicksPage
            onLickSelect={handleLickSelect}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <Header />
      <MainNav
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      {renderSection()}
      <Footer />
    </div>
  );
}

export default App;
