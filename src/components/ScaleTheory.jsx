import { SCALE_DEFINITIONS } from '../data/scales';

function ScaleTheory({ currentScale }) {
    const scale = SCALE_DEFINITIONS[currentScale];

    if (!scale || (!scale.diatonicChords && !scale.recommendProgression)) {
        return null;
    }

    return (
        <section className="scale-theory-section">
            <div className="theory-card">
                <div className="theory-header">
                    <h3>💡 음악 이론 & 활용</h3>
                </div>
                <div className="theory-content">
                    {scale.diatonicChords && (
                        <div className="theory-item">
                            <span className="theory-label">사용 가능한 코드 (Diatonic):</span>
                            <div className="chord-badges">
                                {scale.diatonicChords.map((chord, i) => (
                                    <span key={i} className="chord-badge">{chord}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {scale.recommendProgression && (
                        <div className="theory-item">
                            <span className="theory-label">추천 연습 진행:</span>
                            <p className="progression-text">{scale.recommendProgression}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default ScaleTheory;
