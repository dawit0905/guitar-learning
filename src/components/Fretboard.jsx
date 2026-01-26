import { useState, useCallback } from 'react';
import { SCALE_DEFINITIONS, getScaleNotes, getNoteAtFret, isNoteInScale } from '../data/scales';

const FRET_COUNT = 15;
const FRET_MARKERS = [3, 5, 7, 9, 12, 15];

// Format interval with proper flat symbol alignment
function formatInterval(interval) {
    if (interval.startsWith('b')) {
        return (
            <span className="interval-text">
                <span className="flat-symbol">♭</span>
                <span className="interval-number">{interval.slice(1)}</span>
            </span>
        );
    }
    return <span className="interval-text"><span className="interval-number">{interval}</span></span>;
}

function Fretboard({ currentScale, currentKey, showNotes, showIntervals, onToggleNotes, onToggleIntervals }) {
    const [clickedNote, setClickedNote] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState('all');

    const scale = SCALE_DEFINITIONS[currentScale];
    const scaleNotes = getScaleNotes(currentScale, currentKey);

    const handleNoteClick = useCallback((stringIndex, fret) => {
        const id = `${stringIndex}-${fret}`;
        setClickedNote(id);
        setTimeout(() => setClickedNote(null), 200);
    }, []);

    const POSITIONS = [
        { id: 'all', name: '전체' },
        { id: 'pos1', name: 'Pos 1 (0-3)', range: [0, 3] },
        { id: 'pos2', name: 'Pos 2 (2-5)', range: [2, 5] },
        { id: 'pos3', name: 'Pos 3 (5-8)', range: [5, 8] },
        { id: 'pos4', name: 'Pos 4 (7-10)', range: [7, 10] },
        { id: 'pos5', name: 'Pos 5 (10-13)', range: [10, 13] }
    ];

    const isInPosition = (fret) => {
        if (selectedPosition === 'all') return true;
        const pos = POSITIONS.find(p => p.id === selectedPosition);
        return fret >= pos.range[0] && fret <= pos.range[1];
    };

    return (
        <section className="fretboard-section">
            <div className="fretboard-header">
                <h2 className="section-title">🎸 {currentKey} {scale?.name || ''}</h2>
                <div className="fretboard-controls">
                    <div className="position-selector">
                        <span className="control-label">포지션:</span>
                        <select
                            value={selectedPosition}
                            onChange={(e) => setSelectedPosition(e.target.value)}
                            className="position-select"
                        >
                            {POSITIONS.map(pos => (
                                <option key={pos.id} value={pos.id}>{pos.name}</option>
                            ))}
                        </select>
                    </div>
                    <label className="toggle-label">
                        <input
                            type="checkbox"
                            checked={showNotes}
                            onChange={(e) => onToggleNotes(e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                        음이름 표시
                    </label>
                    <label className="toggle-label">
                        <input
                            type="checkbox"
                            checked={showIntervals}
                            onChange={(e) => onToggleIntervals(e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                        음정 표시
                    </label>
                </div>
            </div>

            <div className="fretboard-container">
                <div className="fretboard">
                    {/* Fret numbers row */}
                    <div className="fret-numbers-row">
                        <div className="string-label"></div>
                        {Array.from({ length: FRET_COUNT + 1 }, (_, fret) => (
                            <div
                                key={fret}
                                className={`fret-number ${fret === 0 ? 'nut' : ''} ${FRET_MARKERS.includes(fret) ? 'marker' : ''} ${!isInPosition(fret) ? 'dimmed' : ''}`}
                            >
                                {fret}
                            </div>
                        ))}
                    </div>

                    {/* Guitar strings */}
                    {Array.from({ length: 6 }, (_, stringIndex) => (
                        <div key={stringIndex} className="guitar-string">
                            <div className="string-label">{stringIndex + 1}</div>
                            {Array.from({ length: FRET_COUNT + 1 }, (_, fret) => {
                                const note = getNoteAtFret(stringIndex, fret);
                                const scaleNote = isNoteInScale(note, scaleNotes);
                                const noteId = `${stringIndex}-${fret}`;
                                const isPos = isInPosition(fret);

                                return (
                                    <div
                                        key={fret}
                                        className={`fret ${fret === 0 ? 'nut' : ''} ${isPos && selectedPosition !== 'all' ? 'highlighted' : ''}`}
                                    >
                                        {scaleNote && (
                                            <div
                                                className={`note-dot ${note === currentKey ? 'root' :
                                                    scaleNote.isBlueNote ? 'blue-note' :
                                                        'scale-note'
                                                    } ${clickedNote === noteId ? 'clicked' : ''} ${!isPos ? 'dimmed' : ''}`}
                                                onClick={() => handleNoteClick(stringIndex, fret)}
                                            >
                                                {showIntervals ? formatInterval(scaleNote.interval) :
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
    );
}

export default Fretboard;
