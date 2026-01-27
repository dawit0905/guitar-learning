import { useState, useCallback } from 'react';
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
            onBack={() => setSelectedLick(null)}
          />
        ) : (
          <LicksPage
            onLickSelect={setSelectedLick}
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
        onSectionChange={setActiveSection}
      />
      {renderSection()}
      <Footer />
    </div>
  );
}

export default App;
