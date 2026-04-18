import { useState } from 'react';
import { NOTES, getNoteAtFret } from '../data/scales';

const FRET_COUNT = 12;

const TRIAD_OPTIONS = [
    {
        id: 'major-open',
        name: 'Major Triad',
        main: 'Maj',
        symbol: '',
        core: '3',
        fifth: '5',
        description: '밝고 안정적인 기본 3화음'
    },
    {
        id: 'minor-open',
        name: 'Minor Triad',
        main: 'm',
        symbol: 'm',
        core: 'b3',
        fifth: '5',
        description: '차분하고 어두운 성격의 3화음'
    },
    {
        id: 'sus2',
        name: 'Suspended 2',
        main: 'sus2',
        symbol: 'sus2',
        core: '2',
        fifth: '5',
        description: '3도 대신 2도를 써서 열린 느낌을 냄'
    },
    {
        id: 'sus4',
        name: 'Suspended 4',
        main: 'sus4',
        symbol: 'sus4',
        core: '4',
        fifth: '5',
        description: '3도 대신 4도를 써서 해결감을 만듦'
    },
    {
        id: 'augmented',
        name: 'Augmented Triad',
        main: 'aug',
        symbol: 'aug',
        core: '3',
        fifth: '#5',
        description: '증5도로 긴장감이 강한 3화음'
    }
];

const SEVENTH_OPTIONS = [
    {
        id: 'dominant7',
        name: 'Dominant 7th',
        main: '7',
        sub: 'Dom',
        seventh: 'b7',
        allowedTriads: ['major-open', 'sus4', 'augmented'],
        description: '해결감이 강한 블루스/재즈 핵심 사운드'
    },
    {
        id: 'major7',
        name: 'Major 7th',
        main: 'maj7',
        seventh: '7',
        allowedTriads: ['major-open', 'augmented'],
        description: '부드럽고 세련된 메이저 성격'
    },
    {
        id: 'minor7',
        name: 'Minor 7th',
        main: 'm7',
        core: 'b3',
        seventh: 'b7',
        allowedTriads: ['minor-open'],
        description: '마이너 펑크/재즈 기본 질감'
    },
    {
        id: 'half-diminished',
        name: 'Minor 7th(b5)',
        main: 'm7b5',
        core: 'b3',
        fifth: 'b5',
        seventh: 'b7',
        allowedTriads: ['minor-open'],
        description: 'ii-V-i에서 자주 쓰는 반감 코드'
    },
    {
        id: 'diminished7',
        name: 'Diminished 7th',
        main: 'dim7',
        core: 'b3',
        fifth: 'b5',
        seventh: 'bb7',
        allowedTriads: ['minor-open'],
        description: '강한 긴장과 이동감을 만드는 코드'
    }
];

const TENSION_OPTIONS = [
    {
        id: '9',
        name: '9th',
        main: '9',
        allowedTriads: ['major-open', 'minor-open', 'sus4', 'augmented'],
        description: '맑고 넓은 사운드를 추가'
    },
    {
        id: '11',
        name: '11th',
        main: '11',
        allowedTriads: ['major-open', 'minor-open', 'augmented'],
        requiresSeventh: true,
        description: '코드에 공간감과 모던함을 더함'
    },
    {
        id: '13',
        name: '13th',
        main: '13',
        allowedTriads: ['major-open', 'minor-open', 'sus4', 'augmented'],
        requiresSeventh: true,
        description: '두꺼운 확장 톤을 더함'
    }
];

const ALTERATION_OPTIONS = [
    {
        id: 'b9',
        name: 'Flat 9',
        main: 'b9',
        slot: 'ninth',
        value: 'b9',
        family: 'ninth',
        allowedTriads: ['major-open', 'sus4', 'augmented'],
        requiresSevenths: ['dominant7'],
        description: '도미넌트 긴장감을 크게 올림'
    },
    {
        id: '#9',
        name: 'Sharp 9',
        main: '#9',
        slot: 'ninth',
        value: '#9',
        family: 'ninth',
        allowedTriads: ['major-open', 'sus4', 'augmented'],
        requiresSevenths: ['dominant7'],
        description: '블루지하고 거친 캐릭터를 만듦'
    },
    {
        id: '#11',
        name: 'Sharp 11',
        main: '#11',
        slot: 'eleventh',
        value: '#11',
        family: 'eleventh',
        allowedTriads: ['major-open', 'sus4', 'augmented'],
        requiresSevenths: ['dominant7'],
        description: '리디안 도미넌트 계열의 색채'
    },
    {
        id: 'b13',
        name: 'Flat 13',
        main: 'b13',
        slot: 'thirteenth',
        value: 'b13',
        family: 'thirteenth',
        allowedTriads: ['major-open', 'sus4', 'augmented'],
        requiresSevenths: ['dominant7'],
        description: '얼터드 도미넌트 느낌을 강화'
    }
];

const CHORD_BUILDER_STEPS = [
    {
        id: 'triad',
        title: '1단계. 트라이어드 선택',
        description: '메이저/마이너처럼 코드의 기본 성격을 먼저 고릅니다.',
        options: TRIAD_OPTIONS
    },
    {
        id: 'seventh',
        title: '2단계. 7th 추가',
        description: '트라이어드에 맞는 7도를 추가합니다. 재클릭하면 해제됩니다.',
        options: SEVENTH_OPTIONS
    },
    {
        id: 'extension',
        title: '3단계. 텐션 추가',
        description: '9, 11, 13을 필요한 만큼 추가합니다.',
        options: TENSION_OPTIONS
    },
    {
        id: 'altered',
        title: '4단계. 변화음 추가',
        description: '도미넌트7 계열에서 b9, #9, #11, b13을 토글합니다.',
        options: ALTERATION_OPTIONS
    }
];

const TRIAD_BY_ID = Object.fromEntries(TRIAD_OPTIONS.map((option) => [option.id, option]));
const SEVENTH_BY_ID = Object.fromEntries(SEVENTH_OPTIONS.map((option) => [option.id, option]));
const TENSION_BY_ID = Object.fromEntries(TENSION_OPTIONS.map((option) => [option.id, option]));
const ALTERATION_BY_ID = Object.fromEntries(ALTERATION_OPTIONS.map((option) => [option.id, option]));

const INITIAL_BUILDER_STATE = {
    triad: TRIAD_OPTIONS[0].id,
    seventh: null,
    tensions: [],
    alterations: []
};

const INTERVAL_TO_SEMITONE = {
    '1': 0,
    'b2': 1,
    '2': 2,
    '#2': 3,
    'b3': 3,
    '3': 4,
    '4': 5,
    '#4': 6,
    'b5': 6,
    '5': 7,
    '#5': 8,
    '6': 9,
    'bb7': 9,
    'b7': 10,
    '7': 11,
    'b9': 13,
    '9': 14,
    '#9': 15,
    '11': 17,
    '#11': 18,
    'b13': 20,
    '13': 21
};

function formatInterval(interval) {
    const str = String(interval);
    if (str.startsWith('b')) {
        return (
            <span className="interval-text">
                <span className="flat-symbol">♭</span>
                <span className="interval-number">{str.slice(1)}</span>
            </span>
        );
    }
    if (str.startsWith('#')) {
        return (
            <span className="interval-text">
                <span className="flat-symbol">♯</span>
                <span className="interval-number">{str.slice(1)}</span>
            </span>
        );
    }
    return <span className="interval-text"><span className="interval-number">{str}</span></span>;
}

function isOptionEnabled(stepId, option, builderState) {
    if (stepId === 'triad') return true;
    if (option.allowedTriads && !option.allowedTriads.includes(builderState.triad)) {
        return false;
    }
    if (option.requiresSeventh && !builderState.seventh) {
        return false;
    }
    if (option.requiresSevenths && !option.requiresSevenths.includes(builderState.seventh)) {
        return false;
    }
    return true;
}

function sanitizeBuilderState(state) {
    const next = {
        triad: TRIAD_BY_ID[state.triad] ? state.triad : INITIAL_BUILDER_STATE.triad,
        seventh: state.seventh,
        tensions: Array.isArray(state.tensions) ? state.tensions : [],
        alterations: Array.isArray(state.alterations) ? state.alterations : []
    };

    if (next.seventh) {
        const seventhOption = SEVENTH_BY_ID[next.seventh];
        if (!seventhOption || !isOptionEnabled('seventh', seventhOption, next)) {
            next.seventh = null;
        }
    }

    const enabledTensions = new Set(
        next.tensions.filter((id) => {
            const option = TENSION_BY_ID[id];
            return option && isOptionEnabled('extension', option, next);
        })
    );
    next.tensions = TENSION_OPTIONS.map((option) => option.id).filter((id) => enabledTensions.has(id));

    const selectedAlterByFamily = {};
    next.alterations.forEach((id) => {
        const option = ALTERATION_BY_ID[id];
        if (!option || !isOptionEnabled('altered', option, next)) return;
        selectedAlterByFamily[option.family] = id;
    });
    const enabledAlterations = new Set(Object.values(selectedAlterByFamily));
    next.alterations = ALTERATION_OPTIONS.map((option) => option.id).filter((id) => enabledAlterations.has(id));

    return next;
}

function buildChordStructure(builderState) {
    const triad = TRIAD_BY_ID[builderState.triad] || TRIAD_OPTIONS[0];
    const seventh = builderState.seventh ? SEVENTH_BY_ID[builderState.seventh] : null;

    const slots = {
        core: triad.core,
        fifth: triad.fifth,
        seventh: null,
        ninth: builderState.tensions.includes('9') ? '9' : null,
        eleventh: builderState.tensions.includes('11') ? '11' : null,
        thirteenth: builderState.tensions.includes('13') ? '13' : null
    };

    if (seventh) {
        if (seventh.core) slots.core = seventh.core;
        if (seventh.fifth) slots.fifth = seventh.fifth;
        slots.seventh = seventh.seventh || null;
    }

    builderState.alterations.forEach((alterId) => {
        const option = ALTERATION_BY_ID[alterId];
        if (!option) return;
        slots[option.slot] = option.value;
    });

    const intervalNames = [
        '1',
        slots.core,
        slots.fifth,
        slots.seventh,
        slots.ninth,
        slots.eleventh,
        slots.thirteenth
    ].filter(Boolean);

    return {
        triad,
        seventh,
        slots,
        intervalNames
    };
}

function getChordNotesFromStructure(chordStructure, rootNote) {
    const rootIndex = NOTES.indexOf(rootNote);
    if (rootIndex === -1) return [];

    return chordStructure.intervalNames
        .map((intervalName, index) => {
            const semitone = INTERVAL_TO_SEMITONE[intervalName];
            if (semitone === undefined) return null;

            return {
                note: NOTES[(rootIndex + semitone) % 12],
                interval: intervalName,
                isRoot: index === 0
            };
        })
        .filter(Boolean);
}

function buildChordSymbol(chordStructure, builderState) {
    const { triad, slots } = chordStructure;
    let symbol = triad.symbol;

    if (builderState.seventh === 'dominant7') {
        if (triad.id === 'major-open') {
            symbol = '7';
        } else if (triad.id === 'sus4') {
            symbol = '7sus4';
        } else {
            symbol = `${triad.symbol}7`;
        }
    }
    if (builderState.seventh === 'major7') {
        symbol = triad.id === 'major-open' ? 'maj7' : `${triad.symbol}maj7`;
    }
    if (builderState.seventh === 'minor7') {
        symbol = 'm7';
    }
    if (builderState.seventh === 'half-diminished') {
        symbol = 'm7b5';
    }
    if (builderState.seventh === 'diminished7') {
        symbol = 'dim7';
    }

    const extensionList = [slots.ninth, slots.eleventh, slots.thirteenth].filter(Boolean);
    if (!extensionList.length) return symbol;

    const extensionText = extensionList.join(',');

    if (!builderState.seventh && triad.id === 'major-open') {
        return extensionList.length === 1 ? `add${extensionText}` : `add(${extensionText})`;
    }
    if (!builderState.seventh && triad.id === 'minor-open') {
        return extensionList.length === 1 && extensionList[0] === '9'
            ? 'madd9'
            : `m(add${extensionText})`;
    }
    if (!builderState.seventh && (triad.id === 'sus2' || triad.id === 'sus4' || triad.id === 'augmented')) {
        return `${triad.symbol}(add${extensionText})`;
    }
    if (!symbol) {
        return `add(${extensionText})`;
    }

    return `${symbol}(${extensionText})`;
}

function buildChordDescription(chordStructure, builderState) {
    const phrases = [chordStructure.triad.description];

    if (builderState.seventh) {
        const seventhDescription = SEVENTH_BY_ID[builderState.seventh]?.description;
        if (seventhDescription) phrases.push(seventhDescription);
    }

    if (builderState.tensions.length) {
        phrases.push(`${builderState.tensions.join(', ')} 텐션 추가`);
    }

    if (builderState.alterations.length) {
        phrases.push(`변화음 ${builderState.alterations.join(', ')} 적용`);
    }

    return phrases.join(' / ');
}

function isStepOptionSelected(stepId, optionId, builderState) {
    if (stepId === 'triad') return builderState.triad === optionId;
    if (stepId === 'seventh') return builderState.seventh === optionId;
    if (stepId === 'extension') return builderState.tensions.includes(optionId);
    if (stepId === 'altered') return builderState.alterations.includes(optionId);
    return false;
}

function ChordSection() {
    const [builderState, setBuilderState] = useState(INITIAL_BUILDER_STATE);
    const [currentKey, setCurrentKey] = useState('A');
    const [showNotes, setShowNotes] = useState(true);
    const [showIntervals, setShowIntervals] = useState(false);

    const chordStructure = buildChordStructure(builderState);
    const chordNotes = getChordNotesFromStructure(chordStructure, currentKey);
    const chordSymbol = buildChordSymbol(chordStructure, builderState);
    const chordDescription = buildChordDescription(chordStructure, builderState);

    const activeStepId = builderState.alterations.length
        ? 'altered'
        : builderState.tensions.length
            ? 'extension'
            : builderState.seventh
                ? 'seventh'
                : 'triad';

    const chordLabel = chordSymbol ? `${currentKey}${chordSymbol}` : currentKey;

    const isNoteInChord = (note) => {
        return chordNotes.find((chordNote) => chordNote.note === note);
    };

    const handleOptionClick = (stepId, optionId) => {
        setBuilderState((prev) => {
            let next = prev;

            if (stepId === 'triad') {
                next = {
                    ...prev,
                    triad: optionId
                };
            }

            if (stepId === 'seventh') {
                next = {
                    ...prev,
                    seventh: prev.seventh === optionId ? null : optionId
                };
            }

            if (stepId === 'extension') {
                const isSelected = prev.tensions.includes(optionId);
                next = {
                    ...prev,
                    tensions: isSelected
                        ? prev.tensions.filter((id) => id !== optionId)
                        : [...prev.tensions, optionId]
                };
            }

            if (stepId === 'altered') {
                const isSelected = prev.alterations.includes(optionId);

                if (isSelected) {
                    next = {
                        ...prev,
                        alterations: prev.alterations.filter((id) => id !== optionId)
                    };
                } else {
                    const family = ALTERATION_BY_ID[optionId]?.family;
                    next = {
                        ...prev,
                        alterations: [...prev.alterations.filter((id) => ALTERATION_BY_ID[id]?.family !== family), optionId]
                    };
                }
            }

            return sanitizeBuilderState(next);
        });
    };

    return (
        <div className="section-content">
            <section className="key-selector-section chord-key-first">
                <h2 className="section-title">
                    <span className="section-title-ko">12키 선택</span>
                    <span className="section-title-en">Twelve Keys</span>
                </h2>
                <p className="section-subtitle">먼저 키를 고르고, 아래에서 코드 요소를 추가하세요.</p>
                <div className="key-selector">
                    {NOTES.map((note) => (
                        <button
                            key={note}
                            className={`key-btn ${currentKey === note ? 'active' : ''}`}
                            onClick={() => setCurrentKey(note)}
                        >
                            {note}
                        </button>
                    ))}
                </div>
            </section>

            <section className="selector-section chord-builder-section">
                <h2 className="section-title">
                    <span className="section-title-ko">코드 빌더</span>
                    <span className="section-title-en">Chord Builder</span>
                </h2>
                <p className="section-subtitle">트라이어드를 기준으로 7th/텐션/변화음을 누적해서 만드세요.</p>
                <div className="chord-builder-flow">
                    {CHORD_BUILDER_STEPS.map((step) => (
                        <article
                            key={step.id}
                            className={`chord-builder-step ${activeStepId === step.id ? 'active' : ''}`}
                        >
                            <h3 className="chord-builder-title">{step.title}</h3>
                            <p className="chord-builder-description">{step.description}</p>

                            <div className="option-tabs secondary chord-type-tabs">
                                {step.options.map((option) => {
                                    const selected = isStepOptionSelected(step.id, option.id, builderState);
                                    const enabled = isOptionEnabled(step.id, option, builderState);

                                    return (
                                        <button
                                            key={option.id}
                                            className={`option-tab ${selected ? 'active' : ''} ${!enabled ? 'disabled' : ''}`}
                                            onClick={() => handleOptionClick(step.id, option.id)}
                                            disabled={!enabled}
                                            title={enabled ? option.name : `${option.name} (현재 조합에서 비활성)`}
                                        >
                                            <span className={`chord-picker-main ${option.main.length > 4 ? 'tight' : ''}`}>
                                                {option.main}
                                            </span>
                                            {option.sub && (
                                                <span className="chord-picker-sub">{option.sub}</span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="fretboard-section">
                <div className="fretboard-header">
                    <div className="fretboard-title-block">
                        <span className="fretboard-kicker">FIG. IV — 코드</span>
                        <h2 className="section-title fretboard-title">
                            <span className="section-title-ko">{chordLabel}</span>
                            <span className="section-title-en">Chord Voicing</span>
                        </h2>
                    </div>
                    <div className="fretboard-controls">
                        <label className="toggle-label">
                            <input
                                type="checkbox"
                                checked={showNotes}
                                onChange={(e) => setShowNotes(e.target.checked)}
                            />
                            <span className="toggle-slider"></span>
                            음이름
                        </label>
                        <label className="toggle-label">
                            <input
                                type="checkbox"
                                checked={showIntervals}
                                onChange={(e) => setShowIntervals(e.target.checked)}
                            />
                            <span className="toggle-slider"></span>
                            음정
                        </label>
                    </div>
                </div>

                <div className="fretboard-container">
                    <div className="fretboard">
                        <div className="fret-numbers-row">
                            <div className="string-label"></div>
                            {Array.from({ length: FRET_COUNT + 1 }, (_, fret) => (
                                <div key={fret} className={`fret-number ${[3, 5, 7, 9, 12].includes(fret) ? 'marker' : ''}`}>
                                    {fret}
                                </div>
                            ))}
                        </div>

                        {Array.from({ length: 6 }, (_, stringIndex) => (
                            <div key={stringIndex} className="guitar-string">
                                <div className="string-label">{stringIndex + 1}</div>
                                {Array.from({ length: FRET_COUNT + 1 }, (_, fret) => {
                                    const note = getNoteAtFret(stringIndex, fret);
                                    const chordNote = isNoteInChord(note);

                                    return (
                                        <div key={fret} className={`fret ${fret === 0 ? 'nut' : ''}`}>
                                            {chordNote && (
                                                <div className={`note-dot ${chordNote.isRoot ? 'root' : 'scale-note'}`}>
                                                    {showIntervals ? formatInterval(chordNote.interval) :
                                                        showNotes ? note : ''}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="scale-info-section">
                <div className="info-card">
                    <div className="info-header">
                        <h3 className="section-title">
                            <span className="section-title-ko">코드 정보</span>
                            <span className="section-title-en">Chord Reference</span>
                        </h3>
                    </div>
                    <div className="info-content">
                        <div className="info-item">
                            <span className="info-label">코드명:</span>
                            <span className="info-value">{chordLabel}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">구성음:</span>
                            <span className="info-value">
                                {chordNotes.map((note) => note.note).join(' - ')}
                            </span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">음정:</span>
                            <span className="info-value">
                                {chordStructure.intervalNames.join(' - ')}
                            </span>
                        </div>
                        <div className="info-item description">
                            <span className="info-label">설명:</span>
                            <p className="info-value">{chordDescription}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ChordSection;
