const SCALE_OPTIONS = [
    { id: 'minor-pentatonic', icon: '⭐', name: '마이너 펜타토닉' },
    { id: 'major', icon: '🎼', name: '메이저 스케일' },
    { id: 'blues', icon: '🎷', name: '블루스 스케일' },
    { id: 'natural-minor', icon: '🌙', name: '내추럴 마이너' },
    { id: 'major-pentatonic', icon: '☀️', name: '메이저 펜타토닉' },
    { id: 'harmonic-minor', icon: '🎻', name: '하모닉 마이너' },
    { id: 'dorian', icon: '🎺', name: '도리안 모드' },
    { id: 'mixolydian', icon: '🎹', name: '믹솔리디안 모드' }
];

function ScaleSelector({ currentScale, onScaleChange }) {
    return (
        <section className="scale-selector-section">
            <h2 className="section-title">🎵 스케일 선택</h2>
            <div className="scale-tabs">
                {SCALE_OPTIONS.map(scale => (
                    <button
                        key={scale.id}
                        className={`scale-tab ${currentScale === scale.id ? 'active' : ''}`}
                        onClick={() => onScaleChange(scale.id)}
                    >
                        <span className="tab-icon">{scale.icon}</span>
                        {scale.name}
                    </button>
                ))}
            </div>
        </section>
    );
}

export default ScaleSelector;
