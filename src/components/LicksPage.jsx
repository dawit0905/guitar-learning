import { useMemo, useState } from 'react';
import { licks } from '../data/licks';

const NOTE_ORDER = {
    C: 0,
    'C#': 1,
    D: 2,
    'D#': 3,
    E: 4,
    F: 5,
    'F#': 6,
    G: 7,
    'G#': 8,
    A: 9,
    'A#': 10,
    B: 11
};

function sortKeys(a, b) {
    const aMinor = a.endsWith('m');
    const bMinor = b.endsWith('m');
    const aRoot = aMinor ? a.slice(0, -1) : a;
    const bRoot = bMinor ? b.slice(0, -1) : b;

    const aOrder = NOTE_ORDER[aRoot] ?? 99;
    const bOrder = NOTE_ORDER[bRoot] ?? 99;
    if (aOrder !== bOrder) return aOrder - bOrder;
    if (aMinor !== bMinor) return aMinor ? 1 : -1;
    return a.localeCompare(b);
}

function LicksPage({ onLickSelect }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeDifficulty, setActiveDifficulty] = useState('All');
    const [activeKey, setActiveKey] = useState('All');

    const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
    const keyOptions = useMemo(() => {
        const keySet = new Set();
        licks.forEach((lick) => {
            (lick.keys || []).forEach((key) => keySet.add(key));
        });
        return ['All', ...Array.from(keySet).sort(sortKeys)];
    }, []);

    const filteredLicks = licks.filter(lick => {
        const matchesSearch = lick.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lick.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDifficulty = activeDifficulty === 'All' || lick.difficulty === activeDifficulty;
        const matchesKey = activeKey === 'All' || (lick.keys || []).includes(activeKey);
        return matchesSearch && matchesDifficulty && matchesKey;
    });

    const groupedLicks = filteredLicks.reduce((acc, lick) => {
        if (!acc[lick.difficulty]) acc[lick.difficulty] = [];
        acc[lick.difficulty].push(lick);
        return acc;
    }, {});

    return (
        <div className="section-content">
            <section className="selector-section">
                <h2 className="section-title">🔍 기타 릭 검색</h2>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="릭 제목이나 작성자 검색..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </section>

            <section className="selector-section">
                <h2 className="section-title">📊 난이도 필터</h2>
                <div className="option-tabs">
                    {difficulties.map(diff => (
                        <button
                            key={diff}
                            className={`option-tab ${activeDifficulty === diff ? 'active' : ''}`}
                            onClick={() => setActiveDifficulty(diff)}
                        >
                            {diff === 'All' ? '전체' :
                                diff === 'Beginner' ? '입문' :
                                    diff === 'Intermediate' ? '중급' : '고급'}
                        </button>
                    ))}
                </div>
            </section>

            <section className="selector-section">
                <h2 className="section-title">🎼 키/코드 필터</h2>
                <div className="option-tabs key-tabs">
                    {keyOptions.map(key => (
                        <button
                            key={key}
                            className={`option-tab ${activeKey === key ? 'active' : ''}`}
                            onClick={() => setActiveKey(key)}
                        >
                            {key === 'All' ? '전체' : key}
                        </button>
                    ))}
                </div>
            </section>

            <div className="licks-grid">
                {Object.keys(groupedLicks).length > 0 ? (
                    difficulties.slice(1).map(diff => {
                        const licksInDiff = groupedLicks[diff];
                        if (!licksInDiff || licksInDiff.length === 0) return null;

                        return (
                            <section key={diff} className="lick-category-group">
                                <h3 className={`category-subtitle ${diff.toLowerCase()}`}>
                                    {diff === 'Beginner' ? '🟢 입문 단계' :
                                        diff === 'Intermediate' ? '🟡 중급 단계' : '🔴 고급 단계'}
                                </h3>
                                <div className="licks-list">
                                    {licksInDiff.map(lick => (
                                        <div
                                            key={lick.id}
                                            className="lick-card"
                                            onClick={() => onLickSelect(lick)}
                                        >
                                            <div className="lick-card-info">
                                                <h4>{lick.title}</h4>
                                                <span className="lick-author">by {lick.author}</span>
                                                {lick.keys && lick.keys.length > 0 && (
                                                    <div className="lick-keys">
                                                        {lick.keys.slice(0, 3).map((key) => (
                                                            <span key={key} className="lick-key-badge">
                                                                {key}
                                                            </span>
                                                        ))}
                                                        {lick.keys.length > 3 && (
                                                            <span className="lick-key-more">
                                                                +{lick.keys.length - 3}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="lick-date">{lick.date}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        );
                    })
                ) : (
                    <div className="no-results">검색 결과가 없습니다.</div>
                )}
            </div>
        </div>
    );
}

export default LicksPage;
