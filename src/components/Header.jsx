function Header() {
    return (
        <header className="header">
            <div className="header-kicker">
                <span className="kicker-mark">§ 00</span>
                <span className="kicker-label">Luthier's Manual</span>
            </div>

            <h1 className="header-title">지판 안내서</h1>

            <p className="header-subtitle">
                <span className="subtitle-rule" aria-hidden="true" />
                <span>A Practitioner's Guide to the Fretboard · Vol. I</span>
            </p>
        </header>
    );
}

export default Header;
