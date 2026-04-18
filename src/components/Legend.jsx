function Legend() {
    return (
        <section className="legend-section">
            <h3 className="legend-title">범례 · Legend</h3>
            <div className="legend">
                <div className="legend-item">
                    <span className="legend-dot root" aria-hidden="true"></span>
                    <span>으뜸음 (Root)</span>
                </div>
                <div className="legend-item">
                    <span className="legend-dot scale-note" aria-hidden="true"></span>
                    <span>스케일 구성음</span>
                </div>
                <div className="legend-item">
                    <span className="legend-dot blue-note" aria-hidden="true"></span>
                    <span>블루 노트 (♭5)</span>
                </div>
            </div>
        </section>
    );
}

export default Legend;
