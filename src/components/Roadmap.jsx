import { Fragment } from 'react';
import { SCALE_DEFINITIONS } from '../data/scales';

const STAGES = [
    { stage: 1, title: '필수 기초', subtitle: '80% 이상 커버' },
    { stage: 2, title: '표현력 확장', subtitle: '솔로 연주용' },
    { stage: 3, title: '장르별 심화', subtitle: '중급 이상' }
];

function Roadmap({ currentScale, onStageClick }) {
    const currentStage = SCALE_DEFINITIONS[currentScale]?.stage || 1;

    return (
        <section className="roadmap-section">
            <h2 className="section-title">📚 학습 로드맵</h2>
            <div className="roadmap">
                {STAGES.map((item, index) => (
                    <Fragment key={item.stage}>
                        {index > 0 && <div className="roadmap-connector" />}
                        <div
                            className={`roadmap-stage stage-${item.stage} ${currentStage === item.stage ? 'active' : ''}`}
                            onClick={() => onStageClick(item.stage)}
                        >
                            <div className="stage-badge">{item.stage}단계</div>
                            <div className="stage-content">
                                <h3>{item.title}</h3>
                                <p>{item.subtitle}</p>
                            </div>
                        </div>
                    </Fragment>
                ))}
            </div>
        </section>
    );
}

export default Roadmap;
