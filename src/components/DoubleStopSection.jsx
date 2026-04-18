import { useState } from 'react';
import { DOUBLE_STOP_TYPES, getDoubleStopNotes } from '../data/doublestops';
import { NOTES, getNoteAtFret } from '../data/scales';

const DOUBLE_STOP_OPTIONS = [
    { id: 'thirds', name: '3도' },
    { id: 'sixths', name: '6도' },
    { id: 'octaves', name: '옥타브' },
    { id: 'fourths', name: '4도' },
    { id: 'fifths', name: '5도 (파워)' }
];

const FRET_COUNT = 12;

// Format interval with proper flat symbol
function formatInterval(interval) {
    const str = String(interval);
    if (str.startsWith('b')) {
        return (
            <span className="interval-text">
                <span className="flat-symbol">♭</span>
                <span className="interval-number">{str.slice(1)}</span>
            </span>
        );
    }
    if (str.startsWith('#')) {
        return (
            <span className="interval-text">
                <span className="flat-symbol">♯</span>
                <span className="interval-number">{str.slice(1)}</span>
            </span>
        );
    }
    return <span className="interval-text"><span className="interval-number">{str}</span></span>;
}

function DoubleStopSection() {
    const [currentType, setCurrentType] = useState('thirds');
    const [currentKey, setCurrentKey] = useState('A');
    const [showNotes, setShowNotes] = useState(true);
    const [showIntervals, setShowIntervals] = useState(false);

    const doubleStop = DOUBLE_STOP_TYPES[currentType];
    const doubleStopNotes = getDoubleStopNotes(currentType, currentKey);

    const isNoteInDoubleStop = (note) => {
        const found = doubleStopNotes.find(dsn => dsn.note === note);
        if (found) {
            // Add interval info for display
            return {
                ...found,
                interval: found.isRoot ? '1' : getIntervalName(currentType)
            };
        }
        return null;
    };

    // Get interval name based on double stop type
    const getIntervalName = (type) => {
        switch (type) {
            case 'thirds': return '3';
            case 'sixths': return '6';
            case 'octaves': return '8';
            case 'fourths': return '4';
            case 'fifths': return '5';
            default: return '';
        }
    };

    return (
        <div className="section-content">
            {/* Double Stop Type Selector */}
            <section className="selector-section">
                <h2 className="section-title">
                    <span className="section-title-ko">더블스탑 종류</span>
                    <span className="section-title-en">Double Stops</span>
                </h2>
                <div className="option-tabs">
                    {DOUBLE_STOP_OPTIONS.map(opt => (
                        <button
                            key={opt.id}
                            className={`option-tab ${currentType === opt.id ? 'active' : ''}`}
                            onClick={() => setCurrentType(opt.id)}
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

            {/* Double Stop Fretboard */}
            <section className="fretboard-section">
                <div className="fretboard-header">
                    <div className="fretboard-title-block">
                        <span className="fretboard-kicker">FIG. III — 더블스탑</span>
                        <h2 className="section-title fretboard-title">
                            <span className="section-title-ko">{currentKey} {doubleStop?.name}</span>
                            <span className="section-title-en">Double Stops</span>
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
                                    const dsNote = isNoteInDoubleStop(note);

                                    return (
                                        <div key={fret} className={`fret ${fret === 0 ? 'nut' : ''}`}>
                                            {dsNote && (
                                                <div className={`note-dot ${dsNote.isRoot ? 'root' : 'scale-note'}`}>
                                                    {showIntervals ? formatInterval(dsNote.interval) :
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

            {/* Double Stop Info */}
            <section className="scale-info-section">
                <div className="info-card">
                    <div className="info-header">
                        <h3 className="section-title">
                            <span className="section-title-ko">더블스탑 정보</span>
                            <span className="section-title-en">Double Stop Reference</span>
                        </h3>
                    </div>
                    <div className="info-content">
                        <div className="info-item">
                            <span className="info-label">구성음:</span>
                            <span className="info-value">
                                {doubleStopNotes.map(n => n.note).join(' - ')}
                            </span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">인터벌:</span>
                            <span className="info-value">{doubleStop?.interval} 반음</span>
                        </div>
                        <div className="info-item description">
                            <span className="info-label">설명:</span>
                            <p className="info-value">{doubleStop?.description}</p>
                        </div>
                        <div className="info-item">
                            <span className="info-label">활용:</span>
                            <span className="info-value">{doubleStop?.usage}</span>
                        </div>
                        {doubleStop?.examples && (
                            <div className="info-item">
                                <span className="info-label">예시:</span>
                                <span className="info-value">{doubleStop.examples.join(', ')}</span>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default DoubleStopSection;
