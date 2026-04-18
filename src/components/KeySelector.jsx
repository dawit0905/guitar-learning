import { NOTES } from '../data/scales';

const ACCIDENTAL_NOTES = new Set(['C#', 'D#', 'F#', 'G#', 'A#']);

function KeySelector({ currentKey, onKeyChange }) {
    return (
        <section className="key-selector-section">
            <h2 className="section-title">
                <span className="section-title-ko">키(Key) 선택</span>
                <span className="section-title-en">Select Key</span>
            </h2>
            <div className="key-selector">
                {NOTES.map(note => {
                    const isAccidental = ACCIDENTAL_NOTES.has(note);
                    return (
                        <button
                            key={note}
                            className={`key-btn ${currentKey === note ? 'active' : ''} ${isAccidental ? 'accidental' : 'natural'}`}
                            onClick={() => onKeyChange(note)}
                            aria-pressed={currentKey === note}
                            aria-label={`${note} key`}
                        >
                            {note}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}

export default KeySelector;
