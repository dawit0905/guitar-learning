const TIPS = [
    {
        kicker: 'I',
        title: '모양으로 외우기',
        en: 'Shapes First',
        description: '처음부터 계이름을 따지기보다 지판 위에서 손가락이 움직이는 \'블록 모양\'을 먼저 외우세요.'
    },
    {
        kicker: 'II',
        title: '백킹 트랙 활용',
        en: 'Play Along',
        description: '스케일만 오르락내리락하면 지루합니다. 유튜브에서 "A Minor Pentatonic Backing Track"을 검색해서 연습하세요.'
    },
    {
        kicker: 'III',
        title: '박스 1 먼저',
        en: 'Box One',
        description: '6번 줄 으뜸음(Root)인 \'Form 1\'을 먼저 완벽히 외우세요. 이것만으로도 많은 곡을 연주할 수 있습니다.'
    },
    {
        kicker: 'IV',
        title: '천천히 정확하게',
        en: 'Slow & Precise',
        description: '빠르게 치려 하지 마세요. 메트로놈에 맞춰 천천히 정확하게 연습하면 속도는 자연히 붙습니다.'
    }
];

function PracticeTips() {
    return (
        <section className="tips-section">
            <h2 className="section-title">
                <span className="section-title-ko">연습 팁</span>
                <span className="section-title-en">Practice Notes</span>
            </h2>
            <div className="tips-grid">
                {TIPS.map((tip, index) => (
                    <article key={index} className="tip-card">
                        <div className="tip-kicker">{tip.kicker}</div>
                        <h4 className="tip-title">
                            <span className="tip-title-ko">{tip.title}</span>
                            <span className="tip-title-en">{tip.en}</span>
                        </h4>
                        <p>{tip.description}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default PracticeTips;
