import { useState } from 'react';
import { licks } from '../data/licks';

function LicksPage({ onLickSelect }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeDifficulty, setActiveDifficulty] = useState('All');

    const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

    const filteredLicks = licks.filter(lick => {
        const matchesSearch = lick.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lick.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDifficulty = activeDifficulty === 'All' || lick.difficulty === activeDifficulty;
        return matchesSearch && matchesDifficulty;
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
