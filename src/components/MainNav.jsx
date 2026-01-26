function MainNav({ activeSection, onSectionChange }) {
    const sections = [
        { id: 'scales', icon: '🎵', name: '스케일' },
        { id: 'modes', icon: '🎭', name: '모달' },
        { id: 'triads', icon: '🔺', name: '트라이어드' },
        { id: 'doublestops', icon: '🎸', name: '더블스탑' },
        { id: 'chords', icon: '🎹', name: '코드' }
    ];

    return (
        <nav className="main-nav">
            <div className="nav-tabs">
                {sections.map(section => (
                    <button
                        key={section.id}
                        className={`nav-tab ${activeSection === section.id ? 'active' : ''}`}
                        onClick={() => onSectionChange(section.id)}
                    >
                        <span className="nav-icon">{section.icon}</span>
                        <span className="nav-label">{section.name}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
}

export default MainNav;
