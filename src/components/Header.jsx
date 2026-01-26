import { useState } from 'react';

function Header() {
    return (
        <header className="header">
            <div className="logo">
                <span className="logo-icon">🎸</span>
                <h1>기타 스케일 마스터</h1>
            </div>
            <p className="subtitle">실전 활용도 순으로 배우는 스케일 학습</p>
        </header>
    );
}

export default Header;
