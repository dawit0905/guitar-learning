function LickDetail({ lick, onBack }) {
    if (!lick) return null;

    const tabValue = (lick.tab || '').trim();
    const isHttpUrl = /^https?:\/\//i.test(tabValue);
    const isImageTab = /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i.test(tabValue);
    const isMidiTab = /\.mid(\?.*)?$/i.test(tabValue);
    const difficultyKo = lick.difficulty === 'Beginner' ? '입문' :
        lick.difficulty === 'Intermediate' ? '중급' : '고급';
    const primaryKey = lick.keys && lick.keys[0];

    return (
        <div className="section-content lick-detail">
            <div className="detail-header">
                <button className="back-btn" onClick={onBack}>
                    ← 목록으로 돌아가기 · Back to Index
                </button>
            </div>

            <section className="fretboard-section lick-detail-section">
                <div className="lick-detail-info">
                    <div className="lick-meta">
                        <span className="lick-kicker">
                            LICK № {lick.id}
                            {primaryKey && ` — ${primaryKey}`}
                            {lick.difficulty && ` · ${lick.difficulty.toUpperCase()}`}
                        </span>
                        <h2 className="lick-title">{lick.title}</h2>
                        <span className="lick-credits">
                            <span className={`difficulty-badge ${lick.difficulty.toLowerCase()}`}>
                                {difficultyKo}
                            </span>
                            <span>by {lick.author}</span>
                            <span className="lick-meta-sep" aria-hidden="true">—</span>
                            <span>{lick.date}</span>
                        </span>
                    </div>

                    <div className="tab-container">
                        <span className="tab-measure-marks" aria-hidden="true">
                            <span>M 1</span><span>2</span><span>3</span><span>4</span>
                        </span>
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
                            {isImageTab ? (
                                <div className="tab-media">
                                    <img
                                        src={tabValue}
                                        alt={`${lick.title} 탭 이미지`}
                                        className="tab-image"
                                        loading="lazy"
                                    />
                                </div>
                            ) : isMidiTab ? (
                                <div className="tab-media">
                                    <a className="tab-media-link" href={tabValue} target="_blank" rel="noreferrer">
                                        MIDI 파일 열기
                                    </a>
                                </div>
                            ) : isHttpUrl ? (
                                <div className="tab-media">
                                    <a className="tab-media-link" href={tabValue} target="_blank" rel="noreferrer">
                                        탭 링크 열기
                                    </a>
                                </div>
                            ) : (
                                tabValue.split('\n').map((line, lineIdx) => (
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
                                ))
                            )}
                        </div>
                    </div>

                    <div className="description-container">
                        <h3>설명 · Notes</h3>
                        <p>{lick.description}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default LickDetail;
