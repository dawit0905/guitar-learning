import { SCALE_DEFINITIONS } from '../data/scales';

function ScaleSelector({ currentScale, onScaleChange }) {
    const scaleOptions = Object.entries(SCALE_DEFINITIONS)
        .filter(([_, def]) => def.category !== 'modes')
        .map(([id, def]) => ({ id, name: def.name }));

    return (
        <section className="scale-selector-section">
            <h2 className="section-title">
                <span className="section-title-ko">스케일 선택</span>
                <span className="section-title-en">Select Scale</span>
            </h2>
            <div className="scale-tabs">
                {scaleOptions.map(scale => (
                    <button
                        key={scale.id}
                        className={`scale-tab ${currentScale === scale.id ? 'active' : ''}`}
                        onClick={() => onScaleChange(scale.id)}
                    >
                        {scale.name}
                    </button>
                ))}
            </div>
        </section>
    );
}

export default ScaleSelector;
