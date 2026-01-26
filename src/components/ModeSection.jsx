import { SCALE_DEFINITIONS } from '../data/scales';
import KeySelector from './KeySelector';
import Fretboard from './Fretboard';
import ScaleInfo from './ScaleInfo';
import ScaleTheory from './ScaleTheory';
import Legend from './Legend';

const MODE_ORDER = ['ionian', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian'];

function ModeSection({
    currentMode,
    setCurrentMode,
    currentKey,
    setCurrentKey,
    showNotes,
    setShowNotes,
    showIntervals,
    setShowIntervals
}) {
    // If current selection is not a mode, default to ionian
    const activeModeId = MODE_ORDER.includes(currentMode) ? currentMode : 'ionian';

    return (
        <div className="mode-section">
            <section className="scale-selector-section">
                <h2 className="section-title">🎭 7가지 모드 (Major Scale Modes)</h2>
                <div className="scale-tabs">
                    {MODE_ORDER.map(modeId => {
                        const mode = SCALE_DEFINITIONS[modeId];
                        return (
                            <button
                                key={modeId}
                                className={`scale-tab ${activeModeId === modeId ? 'active' : ''}`}
                                onClick={() => setCurrentMode(modeId)}
                            >
                                <span className="tab-icon">🎭</span>
                                {mode.name}
                            </button>
                        );
                    })}
                </div>
            </section>

            <KeySelector
                currentKey={currentKey}
                onKeyChange={setCurrentKey}
            />

            <Fretboard
                currentScale={activeModeId}
                currentKey={currentKey}
                showNotes={showNotes}
                showIntervals={showIntervals}
                onToggleNotes={setShowNotes}
                onToggleIntervals={setShowIntervals}
            />

            <ScaleInfo
                currentScale={activeModeId}
                currentKey={currentKey}
            />

            <ScaleTheory
                currentScale={activeModeId}
            />

            <Legend />
        </div>
    );
}

export default ModeSection;
