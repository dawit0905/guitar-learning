function Legend() {
    return (
        <section className="legend-section">
            <h3>🎨 범례</h3>
            <div className="legend">
                <div className="legend-item">
                    <span className="legend-dot root"></span>
                    <span>으뜸음 (Root)</span>
                </div>
                <div className="legend-item">
                    <span className="legend-dot scale-note"></span>
                    <span>스케일 구성음</span>
                </div>
                <div className="legend-item">
                    <span className="legend-dot blue-note"></span>
                    <span>블루 노트 (b5)</span>
                </div>
            </div>
        </section>
    );
}

export default Legend;
