import { SCALE_DEFINITIONS } from '../data/scales';

const CATEGORY_ICONS = {
    'pentatonic': '⭐',
    'major-minor': '🎼',
    'jazz': '🎷',
    'symmetric': '🌀'
};

function ScaleSelector({ currentScale, onScaleChange }) {
    // Filter scales for this tab (all except 'modes')
    const scaleOptions = Object.entries(SCALE_DEFINITIONS)
        .filter(([_, def]) => def.category !== 'modes')
        .map(([id, def]) => ({
            id,
            name: def.name,
            icon: CATEGORY_ICONS[def.category] || '🎵'
        }));

    return (
        <section className="scale-selector-section">
            <h2 className="section-title">🎵 스케일 선택</h2>
            <div className="scale-tabs">
                {scaleOptions.map(scale => (
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
