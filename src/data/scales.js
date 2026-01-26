// ====================================
// Scale Definitions
// ====================================

export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Standard tuning: E A D G B E (from 6th to 1st string)
export const STANDARD_TUNING = ['E', 'A', 'D', 'G', 'B', 'E'];

// Scale intervals (in semitones from root)
export const SCALE_DEFINITIONS = {
    // --- Pentatonics ---
    'minor-pentatonic': {
        name: '마이너 펜타토닉',
        nameEn: 'Minor Pentatonic',
        category: 'pentatonic',
        intervals: [0, 3, 5, 7, 10],
        intervalNames: ['1', 'b3', '4', '5', 'b7'],
        genres: '록, 블루스, 팝, 메탈',
        stage: 1,
        description: '마이너 펜타토닉은 5개의 음으로 구성된 스케일로, 입문자가 가장 먼저 배워야 할 필수 스케일입니다.',
        diatonicChords: ['m7', 'min', 'm11'],
        recommendProgression: 'i - iv - v (Am - Dm - Em)'
    },
    'major-pentatonic': {
        name: '메이저 펜타토닉',
        nameEn: 'Major Pentatonic',
        category: 'pentatonic',
        intervals: [0, 2, 4, 7, 9],
        intervalNames: ['1', '2', '3', '5', '6'],
        genres: '팝, 컨트리, 펑크, 록',
        stage: 3,
        description: '밝고 경쾌한 느낌을 주는 5음 스케일입니다.',
        diatonicChords: ['maj7', 'maj6', 'add9'],
        recommendProgression: 'I - IV - V (C - F - G)'
    },

    // --- Major & Minor ---
    'major': {
        name: '메이저 스케일',
        nameEn: 'Major Scale (Ionian)',
        category: 'major-minor',
        intervals: [0, 2, 4, 5, 7, 9, 11],
        intervalNames: ['1', '2', '3', '4', '5', '6', '7'],
        genres: '팝, 컨트리, 재즈, 클래식',
        stage: 1,
        description: '모든 음악 이론의 기준이 되는 가장 중요한 스케일입니다.',
        diatonicChords: ['IMaj7', 'iim7', 'iiim7', 'IVMaj7', 'V7', 'vim7', 'viim7b5'],
        recommendProgression: 'I - IV - V - I'
    },
    'natural-minor': {
        name: '내추럴 마이너',
        nameEn: 'Natural Minor (Aeolian)',
        category: 'major-minor',
        intervals: [0, 2, 3, 5, 7, 8, 10],
        intervalNames: ['1', '2', 'b3', '4', '5', 'b6', 'b7'],
        genres: '발라드, 록, 메탈, 클래식',
        stage: 2,
        description: '슬프고 서정적인 느낌을 주는 서양 음악의 기초 마이너 스케일입니다.',
        diatonicChords: ['im7', 'iim7b5', 'bIIIMaj7', 'ivm7', 'vm7', 'bVIMaj7', 'bVII7'],
        recommendProgression: 'im - bVI - bVII - im'
    },
    'harmonic-minor': {
        name: '하모닉 마이너',
        nameEn: 'Harmonic Minor',
        category: 'major-minor',
        intervals: [0, 2, 3, 5, 7, 8, 11],
        intervalNames: ['1', '2', 'b3', '4', '5', 'b6', '7'],
        genres: '네오 클래시컬, 메탈, 플라멩코',
        stage: 3,
        description: '7번째 음을 올린 마이너 스케일로, 독특한 긴장감을 줍니다.',
        diatonicChords: ['im(Maj7)', 'idim7', 'bIIIMaj7#5', 'ivm7', 'V7', 'bVIMaj7', 'viidim7']
    },
    'blues': {
        name: '블루스 스케일',
        nameEn: 'Blues Scale',
        category: 'major-minor',
        intervals: [0, 3, 5, 6, 7, 10],
        intervalNames: ['1', 'b3', '4', 'b5', '5', 'b7'],
        blueNoteIndex: 3,
        genres: '블루스, 록, 재즈, 펑크',
        stage: 2,
        description: '펜타토닉에 블루 노트(b5)를 추가하여 끈적한 느낌을 줍니다.'
    },

    // --- Jazz Scales ---
    'altered': {
        name: '얼터드 스케일',
        nameEn: 'Altered Scale',
        category: 'jazz',
        intervals: [0, 1, 3, 4, 6, 8, 10],
        intervalNames: ['1', 'b2', '#2', '3', 'b5', 'b6', 'b7'],
        genres: '재즈, 퓨전',
        description: '도미넌트 7th 코드에서 최고의 긴장(Tension)을 만들어내는 스케일입니다.',
        diatonicChords: ['V7alt']
    },
    'lydian-dominant': {
        name: '리디안 도미넌트',
        nameEn: 'Lydian Dominant',
        category: 'jazz',
        intervals: [0, 2, 4, 6, 7, 9, 10],
        intervalNames: ['1', '2', '3', '#4', '5', '6', 'b7'],
        genres: '재즈, 퓨전',
        description: '리디안의 #4와 믹솔리디안의 b7이 결합된 세련된 사운드입니다.',
        diatonicChords: ['7#11']
    },

    // --- Symmetric Scales ---
    'diminished-hw': {
        name: '디미니쉬 스케일 (HW)',
        nameEn: 'Half-Whole Diminished',
        category: 'symmetric',
        intervals: [0, 1, 3, 4, 6, 7, 9, 10],
        intervalNames: ['1', 'b2', 'b3', '3', 'b5', '5', '6', 'b7'],
        genres: '재즈, 퓨전, 메탈',
        description: '반음-온음이 반복되는 대칭 스케일로 도미넌트 코드에 잘 어울립니다.'
    },
    'whole-tone': {
        name: '홀톤 스케일',
        nameEn: 'Whole Tone Scale',
        category: 'symmetric',
        intervals: [0, 2, 4, 6, 8, 10],
        intervalNames: ['1', '2', '3', '#4', '#5', 'b7'],
        genres: '재즈, 현대 음악',
        description: '모든 음이 온음 간격인 스케일로, 몽환적이고 방향성이 없는 사운드를 냅니다.'
    },

    // --- Modes (Separate Category) ---
    'ionian': {
        name: '아이오니안 (Mode 1)',
        nameEn: 'Ionian Mode',
        category: 'modes',
        intervals: [0, 2, 4, 5, 7, 9, 11],
        intervalNames: ['1', '2', '3', '4', '5', '6', '7'],
        description: '메이저 스케일의 첫 번째 모드입니다.'
    },
    'dorian': {
        name: '도리안 (Mode 2)',
        nameEn: 'Dorian Mode',
        category: 'modes',
        intervals: [0, 2, 3, 5, 7, 9, 10],
        intervalNames: ['1', '2', 'b3', '4', '5', '6', 'b7'],
        description: '두 번째 모드로, 펑키하고 세련된 마이너 사운드입니다.'
    },
    'phrygian': {
        name: '프리지안 (Mode 3)',
        nameEn: 'Phrygian Mode',
        category: 'modes',
        intervals: [0, 1, 3, 5, 7, 8, 10],
        intervalNames: ['1', 'b2', 'b3', '4', '5', 'b6', 'b7'],
        description: '세 번째 모드로, 어둡고 스페니쉬한 느낌을 줍니다.'
    },
    'lydian': {
        name: '리디안 (Mode 4)',
        nameEn: 'Lydian Mode',
        category: 'modes',
        intervals: [0, 2, 4, 6, 7, 9, 11],
        intervalNames: ['1', '2', '3', '#4', '5', '6', '7'],
        description: '네 번째 모드로, 신비롭고 공중에 떠 있는 듯한 밝은 사운드입니다.'
    },
    'mixolydian': {
        name: '믹솔리디안 (Mode 5)',
        nameEn: 'Mixolydian Mode',
        category: 'modes',
        intervals: [0, 2, 4, 5, 7, 9, 10],
        intervalNames: ['1', '2', '3', '4', '5', '6', 'b7'],
        description: '다섯 번째 모드로, 블루지한 메이저 사운드입니다.'
    },
    'aeolian': {
        name: '에올리안 (Mode 6)',
        nameEn: 'Aeolian Mode',
        category: 'modes',
        intervals: [0, 2, 3, 5, 7, 8, 10],
        intervalNames: ['1', '2', 'b3', '4', '5', 'b6', 'b7'],
        description: '여섯 번째 모드로, 자연 단음계(Natural Minor)와 같습니다.'
    },
    'locrian': {
        name: '로크리안 (Mode 7)',
        nameEn: 'Locrian Mode',
        category: 'modes',
        intervals: [0, 1, 3, 5, 6, 8, 10],
        intervalNames: ['1', 'b2', 'b3', '4', 'b5', 'b6', 'b7'],
        description: '일곱 번째 모드로, 가장 어둡고 불안정한 사운드를 냅니다.'
    }
};

// Get notes for a scale in a specific key
export function getScaleNotes(scaleName, rootNote) {
    const scale = SCALE_DEFINITIONS[scaleName];
    if (!scale) return [];

    const rootIndex = NOTES.indexOf(rootNote);
    if (rootIndex === -1) return [];

    return scale.intervals.map((interval, i) => ({
        note: NOTES[(rootIndex + interval) % 12],
        interval: scale.intervalNames[i],
        isBlueNote: scale.blueNoteIndex !== undefined && i === scale.blueNoteIndex
    }));
}

// Get note at a specific fret on a specific string
export function getNoteAtFret(stringIndex, fret) {
    const openNote = STANDARD_TUNING[5 - stringIndex]; // Reverse because strings are numbered bottom-up
    const openNoteIndex = NOTES.indexOf(openNote);
    return NOTES[(openNoteIndex + fret) % 12];
}

// Check if a note is in the scale
export function isNoteInScale(note, scaleNotes) {
    return scaleNotes.find(sn => sn.note === note);
}
