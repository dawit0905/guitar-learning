import { SCALE_DEFINITIONS, getScaleNotes } from '../data/scales';

function ScaleInfo({ currentScale, currentKey }) {
    const scale = SCALE_DEFINITIONS[currentScale];
    const scaleNotes = getScaleNotes(currentScale, currentKey);

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
