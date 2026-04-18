import { useState, useCallback } from 'react';
import { SCALE_DEFINITIONS, getScaleNotes, getNoteAtFret, isNoteInScale } from '../data/scales';

const FRET_COUNT = 15;
const FRET_MARKERS = [3, 5, 7, 9, 12, 15];
const SINGLE_INLAY_FRETS = [3, 5, 7, 9, 15];
const DOUBLE_INLAY_FRETS = [12];

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
                <div className="fretboard-title-block">
                    <span className="fretboard-kicker">지판 다이어그램 — FIG. I</span>
                    <h2 className="section-title fretboard-title">
                        <span className="section-title-ko">{currentKey} {scale?.name || ''}</span>
                        <span className="section-title-en">Fretboard Diagram</span>
                    </h2>
                </div>
                <div className="fretboard-controls">
                    <div className="position-selector">
                        <span className="control-label">포지션</span>
                        <select
                            value={selectedPosition}
                            onChange={(e) => setSelectedPosition(e.target.value)}
                            className="position-select"
                            aria-label="프렛보드 포지션 선택"
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
                        음이름
                    </label>
                    <label className="toggle-label">
                        <input
                            type="checkbox"
                            checked={showIntervals}
                            onChange={(e) => onToggleIntervals(e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                        음정
                    </label>
                </div>
            </div>

            <div className="fretboard-container">
                <div className="fretboard">
                    {/* Inlay dot layer */}
                    <div className="fretboard-inlays" aria-hidden="true">
                        <div className="inlay-spacer" />
                        {Array.from({ length: FRET_COUNT + 1 }, (_, fret) => {
                            const isSingle = SINGLE_INLAY_FRETS.includes(fret);
                            const isDouble = DOUBLE_INLAY_FRETS.includes(fret);
                            return (
                                <div key={fret} className="inlay-cell">
                                    {isSingle && <span className="inlay-dot" />}
                                    {isDouble && (
                                        <>
                                            <span className="inlay-dot double top" />
                                            <span className="inlay-dot double bottom" />
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>

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
                                            <button
                                                type="button"
                                                className={`note-dot ${note === currentKey ? 'root' :
                                                    scaleNote.isBlueNote ? 'blue-note' :
                                                        'scale-note'
                                                    } ${clickedNote === noteId ? 'clicked' : ''} ${!isPos ? 'dimmed' : ''}`}
                                                onClick={() => handleNoteClick(stringIndex, fret)}
                                                aria-label={`${stringIndex + 1}번 줄 ${fret}프렛, ${note}, ${scaleNote.interval}`}
                                            >
                                                {showIntervals ? formatInterval(scaleNote.interval) :
                                                    showNotes ? note : ''}
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            <figcaption className="fretboard-caption">
                <span className="caption-label">Fig. I</span>
                <span className="caption-body">
                    지판 다이어그램. <em>적색</em>은 루트, <em>황동</em>은 블루노트, <em>아이보리</em>는 스케일 구성음.
                </span>
            </figcaption>
        </section>
    );
}

export default Fretboard;
