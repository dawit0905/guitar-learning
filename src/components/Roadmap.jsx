import { Fragment } from 'react';
import { SCALE_DEFINITIONS } from '../data/scales';

const STAGES = [
    { stage: 1, title: '필수 기초', en: 'Fundamentals', subtitle: '80% 이상 커버', fasc: 'FASC. 01' },
    { stage: 2, title: '표현력 확장', en: 'Expression', subtitle: '솔로 연주용', fasc: 'FASC. 02' },
    { stage: 3, title: '장르별 심화', en: 'Specialisation', subtitle: '중급 이상', fasc: 'FASC. 03' }
];

function Roadmap({ currentScale, onStageClick }) {
    const currentStage = SCALE_DEFINITIONS[currentScale]?.stage || 1;

    return (
        <section className="roadmap-section">
            <h2 className="section-title">
                <span className="section-title-ko">학습 로드맵</span>
                <span className="section-title-en">Learning Roadmap</span>
            </h2>
            <div className="roadmap">
                {STAGES.map((item, index) => (
                    <Fragment key={item.stage}>
                        {index > 0 && <div className="roadmap-connector" />}
                        <button
                            type="button"
                            className={`roadmap-stage stage-${item.stage} ${currentStage === item.stage ? 'active' : ''}`}
                            onClick={() => onStageClick(item.stage)}
                            aria-pressed={currentStage === item.stage}
                        >
                            <div className="stage-badge">{item.fasc}</div>
                            <div className="stage-content">
                                <h3>{item.title}</h3>
                                <span className="stage-title-en">{item.en}</span>
                                <p>{item.subtitle}</p>
                            </div>
                        </button>
                    </Fragment>
                ))}
            </div>
        </section>
    );
}

export default Roadmap;
