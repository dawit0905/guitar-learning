import { SCALE_DEFINITIONS, getScaleNotes } from '../data/scales';
import { getCompatibleChords } from '../utils/scaleChords';

function ScaleInfo({ currentScale, currentKey }) {
    const scale = SCALE_DEFINITIONS[currentScale];
    const scaleNotes = getScaleNotes(currentScale, currentKey);
    const { primaryChords, secondaryChords } = getCompatibleChords(currentScale, currentKey);
    const hasChords = primaryChords.length > 0 || secondaryChords.length > 0;

    if (!scale) return null;

    return (
        <section className="scale-info-section">
            <div className="info-card">
                <div className="info-header">
                    <h3>📖 스케일 정보</h3>
                </div>
                <div className="info-content">
                    <div className="info-item">
                        <span className="info-label">구성음:</span>
                        <span className="info-value">
                            {scaleNotes.map(n => n.note).join(' - ')}
                        </span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">음정:</span>
                        <span className="info-value">
                            {scale.intervalNames.join(' - ')}
                        </span>
                    </div>
                    {hasChords && (
                        <div className="info-item chords">
                            <span className="info-label">사용 코드:</span>
                            <div className="info-value chords-value">
                                {primaryChords.length > 0 && (
                                    <div className="chord-section">
                                        <div className="chord-group-label">기본 코드</div>
                                        <div className="chord-badges">
                                            {primaryChords.map((chord) => (
                                                <span key={chord} className="chord-badge">{chord}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {secondaryChords.length > 0 && (
                                    <div className="chord-section secondary">
                                        <div className="chord-group-label">대체 코드</div>
                                        <div className="chord-badges">
                                            {secondaryChords.map((chord) => (
                                                <span key={chord} className="chord-badge">{chord}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <div className="info-item">
                        <span className="info-label">활용 장르:</span>
                        <span className="info-value">{scale.genres}</span>
                    </div>
                    <div className="info-item description">
                        <span className="info-label">설명:</span>
                        <p className="info-value">{scale.description}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ScaleInfo;
