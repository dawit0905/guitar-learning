const SECTIONS = [
    { id: 'scales', roman: 'I', name: '스케일', en: 'Scales' },
    { id: 'modes', roman: 'II', name: '모달', en: 'Modes' },
    { id: 'triads', roman: 'III', name: '트라이어드', en: 'Triads' },
    { id: 'doublestops', roman: 'IV', name: '더블스탑', en: 'Double Stops' },
    { id: 'chords', roman: 'V', name: '코드', en: 'Chords' },
    { id: 'licks', roman: 'VI', name: '기타 릭', en: 'Licks' }
];

function MainNav({ activeSection, onSectionChange }) {
    return (
        <nav className="main-nav" aria-label="챕터 목차">
            <div className="nav-tabs" role="tablist">
                {SECTIONS.map((section, index) => {
                    const isActive = activeSection === section.id;
                    return (
                        <button
                            key={section.id}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            tabIndex={isActive ? 0 : -1}
                            data-chapter={index + 1}
                            className={`nav-tab ${isActive ? 'active' : ''}`}
                            onClick={() => onSectionChange(section.id)}
                        >
                            <span className="nav-roman" aria-hidden="true">{section.roman}.</span>
                            <span className="nav-label-group">
                                <span className="nav-label">{section.name}</span>
                                <span className="nav-label-en" aria-hidden="true">{section.en}</span>
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}

export default MainNav;
