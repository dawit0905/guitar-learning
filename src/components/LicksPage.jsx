import { useMemo, useState } from 'react';
import { licks } from '../data/licks';

const NOTE_ORDER = {
    C: 0, 'C#': 1, D: 2, 'D#': 3, E: 4, F: 5,
    'F#': 6, G: 7, 'G#': 8, A: 9, 'A#': 10, B: 11
};

const DIFFICULTY_META = {
    Beginner: { ko: '입문 단계', en: 'Beginner', cls: 'beginner', stars: '★☆☆' },
    Intermediate: { ko: '중급 단계', en: 'Intermediate', cls: 'intermediate', stars: '★★☆' },
    Advanced: { ko: '고급 단계', en: 'Advanced', cls: 'advanced', stars: '★★★' }
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
        <div className="section-content licks-page">
            <header className="licks-header">
                <span className="licks-kicker">카탈로그 — CATALOGUE N° 01</span>
                <h2 className="section-title licks-title">
                    <span className="section-title-ko">기타 릭</span>
                    <span className="section-title-en">Licks Index</span>
                </h2>
                <p className="licks-description">
                    난이도·키·작성자별로 정돈된 릭 모음. 각 항목은 지판 포지션과 함께 전문을 제공한다.
                </p>
            </header>

            <section className="selector-section licks-search">
                <div className="search-container">
                    <label className="search-label" htmlFor="lick-search">검색 · Search</label>
                    <input
                        id="lick-search"
                        type="text"
                        placeholder="제목 또는 작성자…"
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </section>

            <section className="selector-section">
                <div className="filter-row">
                    <span className="filter-label">난이도 · Difficulty</span>
                    <div className="option-tabs">
                        {difficulties.map(diff => (
                            <button
                                key={diff}
                                className={`option-tab ${activeDifficulty === diff ? 'active' : ''}`}
                                onClick={() => setActiveDifficulty(diff)}
                                aria-pressed={activeDifficulty === diff}
                            >
                                {diff === 'All' ? '전체' :
                                    diff === 'Beginner' ? '입문' :
                                        diff === 'Intermediate' ? '중급' : '고급'}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="selector-section">
                <div className="filter-row">
                    <span className="filter-label">키 · Key</span>
                    <div className="option-tabs key-tabs">
                        {keyOptions.map(key => (
                            <button
                                key={key}
                                className={`option-tab ${activeKey === key ? 'active' : ''}`}
                                onClick={() => setActiveKey(key)}
                                aria-pressed={activeKey === key}
                            >
                                {key === 'All' ? '전체' : key}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <div className="licks-grid">
                {Object.keys(groupedLicks).length > 0 ? (
                    difficulties.slice(1).map(diff => {
                        const licksInDiff = groupedLicks[diff];
                        if (!licksInDiff || licksInDiff.length === 0) return null;
                        const meta = DIFFICULTY_META[diff];
                        const [lead, ...rest] = licksInDiff;

                        return (
                            <section key={diff} className={`lick-category-group category-${meta.cls}`}>
                                <header className="category-header">
                                    <span className="category-kicker">§ {meta.cls.toUpperCase()}</span>
                                    <h3 className={`category-subtitle ${meta.cls}`}>
                                        <span className="category-title-ko">{meta.ko}</span>
                                        <span className="category-title-en">{meta.en} · {meta.stars}</span>
                                    </h3>
                                </header>
                                <div className="licks-spread">
                                    {lead && (
                                        <button
                                            type="button"
                                            key={lead.id}
                                            className="lick-card lick-card-lead"
                                            onClick={() => onLickSelect(lead)}
                                            aria-label={`${lead.title} by ${lead.author}`}
                                        >
                                            <div className="lick-card-kicker">Lead Lick · № {lead.id}</div>
                                            <div className="lick-card-info">
                                                <h4>{lead.title}</h4>
                                                <span className="lick-author">by {lead.author}</span>
                                                {lead.keys && lead.keys.length > 0 && (
                                                    <div className="lick-keys">
                                                        {lead.keys.slice(0, 4).map((key) => (
                                                            <span key={key} className="lick-key-badge">{key}</span>
                                                        ))}
                                                        {lead.keys.length > 4 && (
                                                            <span className="lick-key-more">+{lead.keys.length - 4}</span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="lick-date">{lead.date}</span>
                                        </button>
                                    )}
                                    <div className="licks-list">
                                        {rest.map(lick => (
                                            <button
                                                type="button"
                                                key={lick.id}
                                                className="lick-card"
                                                onClick={() => onLickSelect(lick)}
                                                aria-label={`${lick.title} by ${lick.author}`}
                                            >
                                                <div className="lick-card-kicker">№ {lick.id}</div>
                                                <div className="lick-card-info">
                                                    <h4>{lick.title}</h4>
                                                    <span className="lick-author">by {lick.author}</span>
                                                    {lick.keys && lick.keys.length > 0 && (
                                                        <div className="lick-keys">
                                                            {lick.keys.slice(0, 3).map((key) => (
                                                                <span key={key} className="lick-key-badge">{key}</span>
                                                            ))}
                                                            {lick.keys.length > 3 && (
                                                                <span className="lick-key-more">+{lick.keys.length - 3}</span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="lick-date">{lick.date}</span>
                                            </button>
                                        ))}
                                    </div>
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
