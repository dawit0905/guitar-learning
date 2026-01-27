function LickDetail({ lick, onBack }) {
    if (!lick) return null;

    return (
        <div className="section-content">
            <div className="detail-header">
                <button className="back-btn" onClick={onBack}>
                    ← 목록으로 돌아가기
                </button>
            </div>

            <section className="fretboard-section">
                <div className="lick-detail-info">
                    <div className="lick-meta">
                        <span className={`difficulty-badge ${lick.difficulty.toLowerCase()}`}>
                            {lick.difficulty === 'Beginner' ? '입문' :
                                lick.difficulty === 'Intermediate' ? '중급' : '고급'}
                        </span>
                        <h2 className="lick-title">{lick.title}</h2>
                        <span className="lick-credits">작성자: {lick.author} | 날짜: {lick.date}</span>
                    </div>

                    <div className="tab-container">
                        {lick.chords && lick.chords.length > 0 && (
                            <div className="tab-chords">
                                {Array.from({ length: 100 }).map((_, i) => {
                                    const chord = lick.chords.find(c => c.position === i);
                                    return (
                                        <span key={i} className="chord-label-wrapper">
                                            {chord ? <span className="chord-label">{chord.label}</span> : ' '}
                                        </span>
                                    );
                                })}
                            </div>
                        )}
                        <div className="tab-display">
                            {lick.tab.split('\n').map((line, lineIdx) => (
                                <div key={lineIdx} className="tab-line">
                                    {line.split('').map((char, charIdx) => {
                                        let className = 'tab-char';
                                        if (char === '|') className += ' bar-line';
                                        else if (/[0-9]/.test(char)) className += ' note-number';
                                        else if (char === '-') className += ' string-line';

                                        return (
                                            <span key={charIdx} className={className}>
                                                {char}
                                            </span>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="description-container">
                        <h3>📖 설명</h3>
                        <p>{lick.description}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default LickDetail;
