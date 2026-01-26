import { NOTES } from '../data/scales';

function KeySelector({ currentKey, onKeyChange }) {
    return (
        <section className="key-selector-section">
            <h2 className="section-title">🔑 키(Key) 선택</h2>
            <div className="key-selector">
                {NOTES.map(note => (
                    <button
                        key={note}
                        className={`key-btn ${currentKey === note ? 'active' : ''}`}
                        onClick={() => onKeyChange(note)}
                    >
                        {note}
                    </button>
                ))}
            </div>
        </section>
    );
}

export default KeySelector;
