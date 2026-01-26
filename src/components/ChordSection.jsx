import { useState } from 'react';
import { CHORD_TYPES, CHORD_CATEGORIES, getChordNotes } from '../data/chords';
import { NOTES, getNoteAtFret } from '../data/scales';

const CATEGORY_ICONS = {
    'open': '🎹',
    'barre': '✊',
    'seventh': '7️⃣',
    'extended': '⭐',
    'altered': '🌀'
};

const FRET_COUNT = 12;

// Format interval with proper flat/sharp symbol alignment
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

function ChordSection() {
    const [currentChord, setCurrentChord] = useState('major-open');
    const [currentKey, setCurrentKey] = useState('A');
    const [activeCategory, setActiveCategory] = useState('open');
    const [showNotes, setShowNotes] = useState(true);
    const [showIntervals, setShowIntervals] = useState(false);

    const categories = Object.entries(CHORD_CATEGORIES).map(([id, def]) => ({
        id,
        name: def.name,
        icon: CATEGORY_ICONS[id] || '🎵'
    }));

    const filteredChords = Object.entries(CHORD_TYPES)
        .filter(([_, def]) => def.category === activeCategory)
        .map(([id, def]) => ({
            id,
            name: def.name,
            symbol: def.symbol
        }));

    const chord = CHORD_TYPES[currentChord];
    const chordNotes = getChordNotes(currentChord, currentKey);

    const handleCategoryChange = (catId) => {
        setActiveCategory(catId);
        // Set first chord of new category as default
        const firstChord = Object.entries(CHORD_TYPES).find(([_, def]) => def.category === catId);
        if (firstChord) setCurrentChord(firstChord[0]);
    };

    const isNoteInChord = (note) => {
        return chordNotes.find(cn => cn.note === note);
    };

    return (
        <div className="section-content">
            {/* Category Selector */}
            <section className="selector-section">
                <h2 className="section-title">📁 코드 카테고리</h2>
                <div className="option-tabs">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`option-tab ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => handleCategoryChange(cat.id)}
                        >
                            <span className="tab-icon">{cat.icon}</span>
                            {cat.name}
                        </button>
                    ))}
                </div>
            </section>

            {/* Chord Type Selector */}
            <section className="selector-section">
                <h2 className="section-title">🎹 {CHORD_CATEGORIES[activeCategory]?.name} 상세 선택</h2>
                <div className="option-tabs secondary">
                    {filteredChords.map(opt => (
                        <button
                            key={opt.id}
                            className={`option-tab ${currentChord === opt.id ? 'active' : ''}`}
                            onClick={() => setCurrentChord(opt.id)}
                        >
                            {opt.name} ({opt.symbol || 'Maj'})
                        </button>
                    ))}
                </div>
            </section>

            {/* Key Selector */}
            <section className="key-selector-section">
                <h2 className="section-title">🔑 키(Key) 선택</h2>
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

            {/* Chord Fretboard */}
            <section className="fretboard-section">
                <div className="fretboard-header">
                    <h2 className="section-title">🎸 {currentKey}{chord?.symbol} {chord?.name}</h2>
                    <div className="fretboard-controls">
                        <label className="toggle-label">
                            <input
                                type="checkbox"
                                checked={showNotes}
                                onChange={(e) => setShowNotes(e.target.checked)}
                            />
                            <span className="toggle-slider"></span>
                            음이름 표시
                        </label>
                        <label className="toggle-label">
                            <input
                                type="checkbox"
                                checked={showIntervals}
                                onChange={(e) => setShowIntervals(e.target.checked)}
                            />
                            <span className="toggle-slider"></span>
                            음정 표시
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
                                    const chordNote = isNoteInChord(note);

                                    return (
                                        <div key={fret} className={`fret ${fret === 0 ? 'nut' : ''}`}>
                                            {chordNote && (
                                                <div className={`note-dot ${chordNote.isRoot ? 'root' : 'scale-note'}`}>
                                                    {showIntervals ? formatInterval(chordNote.interval) :
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

            {/* Chord Info */}
            <section className="scale-info-section">
                <div className="info-card">
                    <div className="info-header">
                        <h3>📖 코드 정보</h3>
                    </div>
                    <div className="info-content">
                        <div className="info-item">
                            <span className="info-label">코드명:</span>
                            <span className="info-value">{currentKey}{chord?.symbol}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">구성음:</span>
                            <span className="info-value">
                                {chordNotes.map(n => n.note).join(' - ')}
                            </span>
                        </div>
                        {chord?.intervalNames && (
                            <div className="info-item">
                                <span className="info-label">음정:</span>
                                <span className="info-value">
                                    {chord.intervalNames.join(' - ')}
                                </span>
                            </div>
                        )}
                        {chord?.description && (
                            <div className="info-item description">
                                <span className="info-label">설명:</span>
                                <p className="info-value">{chord.description}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ChordSection;
