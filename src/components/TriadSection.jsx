import { useState } from 'react';
import { TRIAD_TYPES, getTriadNotes } from '../data/triads';
import { NOTES, getNoteAtFret } from '../data/scales';

const TRIAD_OPTIONS = [
    { id: 'major', name: '메이저', en: 'Major' },
    { id: 'minor', name: '마이너', en: 'Minor' },
    { id: 'diminished', name: '디미니쉬드', en: 'Dim' },
    { id: 'augmented', name: '어그먼티드', en: 'Aug' }
];

const FRET_COUNT = 12;

// Format interval with proper flat symbol
function formatInterval(interval) {
    if (interval.startsWith('b')) {
        return (
            <span className="interval-text">
                <span className="flat-symbol">♭</span>
                <span className="interval-number">{interval.slice(1)}</span>
            </span>
        );
    }
    if (interval.startsWith('#')) {
        return (
            <span className="interval-text">
                <span className="flat-symbol">♯</span>
                <span className="interval-number">{interval.slice(1)}</span>
            </span>
        );
    }
    return <span className="interval-text"><span className="interval-number">{interval}</span></span>;
}

function TriadSection() {
    const [currentTriad, setCurrentTriad] = useState('major');
    const [currentKey, setCurrentKey] = useState('A');
    const [showNotes, setShowNotes] = useState(true);
    const [showIntervals, setShowIntervals] = useState(false);

    const triad = TRIAD_TYPES[currentTriad];
    const triadNotes = getTriadNotes(currentTriad, currentKey);

    const isNoteInTriad = (note) => {
        return triadNotes.find(tn => tn.note === note);
    };

    return (
        <div className="section-content">
            {/* Triad Type Selector */}
            <section className="selector-section">
                <h2 className="section-title">
                    <span className="section-title-ko">트라이어드 종류</span>
                    <span className="section-title-en">Triad Types</span>
                </h2>
                <div className="option-tabs">
                    {TRIAD_OPTIONS.map(opt => (
                        <button
                            key={opt.id}
                            className={`option-tab ${currentTriad === opt.id ? 'active' : ''}`}
                            onClick={() => setCurrentTriad(opt.id)}
                        >
                            {opt.name}
                        </button>
                    ))}
                </div>
            </section>

            {/* Key Selector */}
            <section className="key-selector-section">
                <h2 className="section-title">
                    <span className="section-title-ko">키(Key) 선택</span>
                    <span className="section-title-en">Select Key</span>
                </h2>
                <div className="key-selector">
                    {NOTES.map(note => (
                        <button
                            key={note}
                            className={`key-btn ${currentKey === note ? 'active' : ''}`}
                            onClick={() => setCurrentKey(note)}
                        >
                            {note}
                        </button>
                    ))}
                </div>
            </section>

            {/* Triad Fretboard */}
            <section className="fretboard-section">
                <div className="fretboard-header">
                    <div className="fretboard-title-block">
                        <span className="fretboard-kicker">FIG. II — 트라이어드</span>
                        <h2 className="section-title fretboard-title">
                            <span className="section-title-ko">{currentKey} {triad?.name}</span>
                            <span className="section-title-en">Triad Diagram</span>
                        </h2>
                    </div>
                    <div className="fretboard-controls">
                        <label className="toggle-label">
                            <input
                                type="checkbox"
                                checked={showNotes}
                                onChange={(e) => setShowNotes(e.target.checked)}
                            />
                            <span className="toggle-slider"></span>
                            음이름
                        </label>
                        <label className="toggle-label">
                            <input
                                type="checkbox"
                                checked={showIntervals}
                                onChange={(e) => setShowIntervals(e.target.checked)}
                            />
                            <span className="toggle-slider"></span>
                            음정
                        </label>
                    </div>
                </div>

                <div className="fretboard-container">
                    <div className="fretboard">
                        {/* Fret numbers */}
                        <div className="fret-numbers-row">
                            <div className="string-label"></div>
                            {Array.from({ length: FRET_COUNT + 1 }, (_, fret) => (
                                <div key={fret} className={`fret-number ${[3, 5, 7, 9, 12].includes(fret) ? 'marker' : ''}`}>
                                    {fret}
                                </div>
                            ))}
                        </div>

                        {/* Strings */}
                        {Array.from({ length: 6 }, (_, stringIndex) => (
                            <div key={stringIndex} className="guitar-string">
                                <div className="string-label">{stringIndex + 1}</div>
                                {Array.from({ length: FRET_COUNT + 1 }, (_, fret) => {
                                    const note = getNoteAtFret(stringIndex, fret);
                                    const triadNote = isNoteInTriad(note);

                                    return (
                                        <div key={fret} className={`fret ${fret === 0 ? 'nut' : ''}`}>
                                            {triadNote && (
                                                <div className={`note-dot ${note === currentKey ? 'root' : 'scale-note'}`}>
                                                    {showIntervals ? formatInterval(triadNote.interval) :
                                                        showNotes ? note : ''}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Triad Info */}
            <section className="scale-info-section">
                <div className="info-card">
                    <div className="info-header">
                        <h3 className="section-title">
                            <span className="section-title-ko">트라이어드 정보</span>
                            <span className="section-title-en">Triad Reference</span>
                        </h3>
                    </div>
                    <div className="info-content">
                        <div className="info-item">
                            <span className="info-label">구성음:</span>
                            <span className="info-value">
                                {triadNotes.map(n => n.note).join(' - ')}
                            </span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">음정:</span>
                            <span className="info-value">
                                {triad?.intervalNames?.join(' - ')}
                            </span>
                        </div>
                        <div className="info-item description">
                            <span className="info-label">설명:</span>
                            <p className="info-value">{triad?.description}</p>
                        </div>
                        <div className="info-item">
                            <span className="info-label">활용:</span>
                            <span className="info-value">{triad?.usage}</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default TriadSection;
