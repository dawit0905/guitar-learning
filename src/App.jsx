import { useState, useCallback } from 'react';
import Header from './components/Header';
import Roadmap from './components/Roadmap';
import ScaleSelector from './components/ScaleSelector';
import KeySelector from './components/KeySelector';
import Fretboard from './components/Fretboard';
import ScaleInfo from './components/ScaleInfo';
import Legend from './components/Legend';
import PracticeTips from './components/PracticeTips';
import Footer from './components/Footer';
import { SCALE_DEFINITIONS } from './data/scales';

function App() {
  const [currentScale, setCurrentScale] = useState('minor-pentatonic');
  const [currentKey, setCurrentKey] = useState('A');
  const [showNotes, setShowNotes] = useState(true);
  const [showIntervals, setShowIntervals] = useState(false);

  const handleStageClick = useCallback((stage) => {
    // Find first scale in this stage
    const scaleInStage = Object.entries(SCALE_DEFINITIONS)
      .find(([name, def]) => def.stage === stage);

    if (scaleInStage) {
      setCurrentScale(scaleInStage[0]);
    }
  }, []);

  return (
    <div className="app-container">
      <Header />
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
      <Legend />
      <PracticeTips />
      <Footer />
    </div>
  );
}

export default App;
