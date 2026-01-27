// ====================================
// Chord Definitions
// ====================================

export const CHORD_CATEGORIES = {
    'open': {
        name: '오픈 코드',
        description: '초보자가 먼저 배우는 기본 코드. 개방현을 활용.'
    },
    'barre': {
        name: '바레 코드',
        description: '검지로 여러 줄을 누르는 코드. 모든 키로 이동 가능.'
    },
    'seventh': {
        name: '7th 코드',
        description: '7도 음을 추가한 코드. 재즈, 블루스 필수.'
    },
    'extended': {
        name: '확장 코드',
        description: '9th, 11th, 13th 등 텐션이 추가된 코드.'
    },
    'altered': {
        name: '변화 코드',
        description: 'b5, #5, b9, #9 등 변화음이 포함된 코드.'
    }
};

export const CHORD_TYPES = {
    // Open Chords
    'major-open': {
        name: '메이저',
        symbol: '',
        category: 'open',
        intervals: [0, 4, 7],
        intervalNames: ['1', '3', '5'],
        openChords: {
            'C': { frets: [-1, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0] },
            'D': { frets: [-1, -1, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2] },
            'E': { frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0] },
            'G': { frets: [3, 2, 0, 0, 0, 3], fingers: [2, 1, 0, 0, 0, 3] },
            'A': { frets: [-1, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0] }
        }
    },
    'minor-open': {
        name: '마이너',
        symbol: 'm',
        category: 'open',
        intervals: [0, 3, 7],
        intervalNames: ['1', 'b3', '5'],
        openChords: {
            'Dm': { frets: [-1, -1, 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1] },
            'Em': { frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0] },
            'Am': { frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0] }
        }
    },

    // Barre Chords
    'major-barre-E': {
        name: '메이저 바레 (E폼)',
        symbol: '',
        category: 'barre',
        baseForm: 'E',
        intervals: [0, 4, 7],
        shape: { frets: [0, 2, 2, 1, 0, 0], fingers: [1, 3, 4, 2, 1, 1] },
        description: 'E 코드 형태를 이동. 6번줄이 루트.'
    },
    'major-barre-A': {
        name: '메이저 바레 (A폼)',
        symbol: '',
        category: 'barre',
        baseForm: 'A',
        intervals: [0, 4, 7],
        shape: { frets: [-1, 0, 2, 2, 2, 0], fingers: [0, 1, 3, 3, 3, 1] },
        description: 'A 코드 형태를 이동. 5번줄이 루트.'
    },
    'minor-barre-E': {
        name: '마이너 바레 (E폼)',
        symbol: 'm',
        category: 'barre',
        baseForm: 'Em',
        intervals: [0, 3, 7],
        shape: { frets: [0, 2, 2, 0, 0, 0], fingers: [1, 3, 4, 1, 1, 1] },
        description: 'Em 코드 형태를 이동. 6번줄이 루트.'
    },
    'minor-barre-A': {
        name: '마이너 바레 (A폼)',
        symbol: 'm',
        category: 'barre',
        baseForm: 'Am',
        intervals: [0, 3, 7],
        shape: { frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 1, 3, 4, 2, 1] },
        description: 'Am 코드 형태를 이동. 5번줄이 루트.'
    },

    // 7th Chords
    'dominant7': {
        name: '도미넌트 7th',
        symbol: '7',
        category: 'seventh',
        intervals: [0, 4, 7, 10],
        intervalNames: ['1', '3', '5', 'b7'],
        description: '블루스의 핵심 코드. 긴장감과 해결을 만든다.',
        openChords: {
            'A7': { frets: [-1, 0, 2, 0, 2, 0], fingers: [0, 0, 2, 0, 3, 0] },
            'E7': { frets: [0, 2, 0, 1, 0, 0], fingers: [0, 2, 0, 1, 0, 0] },
            'D7': { frets: [-1, -1, 0, 2, 1, 2], fingers: [0, 0, 0, 2, 1, 3] },
            'G7': { frets: [3, 2, 0, 0, 0, 1], fingers: [3, 2, 0, 0, 0, 1] },
            'B7': { frets: [-1, 2, 1, 2, 0, 2], fingers: [0, 2, 1, 3, 0, 4] }
        }
    },
    'major7': {
        name: '메이저 7th',
        symbol: 'maj7',
        category: 'seventh',
        intervals: [0, 4, 7, 11],
        intervalNames: ['1', '3', '5', '7'],
        description: '부드럽고 재지한 느낌. 보사노바, 네오소울에 필수.'
    },
    'minor7': {
        name: '마이너 7th',
        symbol: 'm7',
        category: 'seventh',
        intervals: [0, 3, 7, 10],
        intervalNames: ['1', 'b3', '5', 'b7'],
        description: '따뜻하고 둥근 느낌. 재즈, R&B의 기본.'
    },

    // Extended Chords
    'ninth': {
        name: '도미넌트 9th',
        symbol: '9',
        category: 'extended',
        intervals: [0, 4, 7, 10, 14],
        intervalNames: ['1', '3', '5', 'b7', '9'],
        description: '펑키하고 세련된 느낌. Hendrix 코드의 기반.'
    },
    'major9': {
        name: '메이저 9th',
        symbol: 'maj9',
        category: 'extended',
        intervals: [0, 4, 7, 11, 14],
        intervalNames: ['1', '3', '5', '7', '9'],
        description: '매우 부드럽고 화려한 사운드. 팝과 재즈에서 빈번히 사용.'
    },
    'minor9': {
        name: '마이너 9th',
        symbol: 'm9',
        category: 'extended',
        intervals: [0, 3, 7, 10, 14],
        intervalNames: ['1', 'b3', '5', 'b7', '9'],
        description: '감성적이고 깊이 있는 마이너 사운드.'
    },
    'eleventh': {
        name: '11th',
        symbol: '11',
        category: 'extended',
        intervals: [0, 4, 7, 10, 14, 17],
        intervalNames: ['1', '3', '5', 'b7', '9', '11'],
        description: '매우 현대적인 사운드. 보통 3도를 생략하기도 함.'
    },
    'minor11': {
        name: '마이너 11th',
        symbol: 'm11',
        category: 'extended',
        intervals: [0, 3, 7, 10, 14, 17],
        intervalNames: ['1', 'b3', '5', 'b7', '9', '11'],
        description: 'R&B, 네오소울의 핵심적인 코드.'
    },
    'thirteenth': {
        name: '13th',
        symbol: '13',
        category: 'extended',
        intervals: [0, 4, 7, 10, 14, 21],
        intervalNames: ['1', '3', '5', 'b7', '9', '13'],
        description: '도미넌트 계열의 가장 확장된 형태. 재즈의 꽃.'
    },
    'add9': {
        name: '애드 나인',
        symbol: 'add9',
        category: 'extended',
        intervals: [0, 4, 7, 14],
        intervalNames: ['1', '3', '5', '9'],
        description: '7도 없이 9도만 추가. 맑고 깨끗한 느낌.'
    },

    // Altered & Diminished Chords
    'half-diminished': {
        name: '마이너 7th b5',
        symbol: 'm7b5',
        category: 'altered',
        intervals: [0, 3, 6, 10],
        intervalNames: ['1', 'b3', 'b5', 'b7'],
        description: '하프 디미니쉬라고도 함. 단조 2-5-1 진행 필수 코드.'
    },
    'diminished7': {
        name: '디미니쉬 7th',
        symbol: 'dim7',
        category: 'altered',
        intervals: [0, 3, 6, 9],
        intervalNames: ['1', 'b3', 'b5', 'bb7'],
        description: '불안정하고 긴장된 사운드. 반음 위로 해결되는 성질.'
    },
    'dom7b9': {
        name: '7th 플랫9 (b9)',
        symbol: '7b9',
        category: 'altered',
        intervals: [0, 4, 7, 10, 13],
        intervalNames: ['1', '3', '5', 'b7', 'b9'],
        description: '도미넌트의 긴장감을 극대화. 마이너 키로 해결될 때 사용.'
    },
    'dom7#9': {
        name: '7th 샵9 (#9)',
        symbol: '7#9',
        category: 'altered',
        intervals: [0, 4, 7, 10, 15],
        intervalNames: ['1', '3', '5', 'b7', '#9'],
        description: '소위 "Hendrix Chord". 록과 블루스에서 매우 인기.'
    },
    'dom7#11': {
        name: '7th 샵11 (#11)',
        symbol: '7#11',
        category: 'altered',
        intervals: [0, 4, 7, 10, 14, 18],
        intervalNames: ['1', '3', '5', 'b7', '9', '#11'],
        description: '리디안 도미넌트 사운드. 세련된 긴장감을 제공.'
    },
    'dom7b13': {
        name: '7th 플랫13 (b13)',
        symbol: '7b13',
        category: 'altered',
        intervals: [0, 4, 10, 14, 20],
        intervalNames: ['1', '3', 'b7', '9', 'b13'],
        description: '얼터드 스케일 사운드. 강한 해결감을 유도.'
    },
    'augmented': {
        name: '어그먼티드',
        symbol: 'aug',
        category: 'altered',
        intervals: [0, 4, 8],
        intervalNames: ['1', '3', '#5'],
        description: '몽환적이고 긴장된 느낌. 도미넌트 대용으로 사용.',
        openChords: {
            'Caug': { frets: [-1, 3, 2, 1, 1, -1], fingers: [0, 3, 2, 1, 1, 0] },
            'Eaug': { frets: [0, 2, 2, 1, 1, 0], fingers: [0, 2, 3, 1, 1, 0] }
        }
    },

    // Suspended Chords
    'sus4': {
        name: '서스펜디드 4',
        symbol: 'sus4',
        category: 'altered',
        intervals: [0, 5, 7],
        intervalNames: ['1', '4', '5'],
        description: '3도 대신 4도를 사용. 해결되려는 강한 성질.',
        openChords: {
            'Dsus4': { frets: [-1, -1, 0, 2, 3, 3], fingers: [0, 0, 0, 1, 3, 4] },
            'Asus4': { frets: [-1, 0, 2, 2, 3, 0], fingers: [0, 0, 1, 2, 4, 0] },
            'Esus4': { frets: [0, 2, 2, 2, 0, 0], fingers: [0, 2, 3, 4, 0, 0] }
        }
    },
    'sus2': {
        name: '서스펜디드 2',
        symbol: 'sus2',
        category: 'altered',
        intervals: [0, 2, 7],
        intervalNames: ['1', '2', '5'],
        description: '3도 대신 2도를 사용. 공중에 떠 있는 듯한 사운드.',
        openChords: {
            'Dsus2': { frets: [-1, -1, 0, 2, 3, 0], fingers: [0, 0, 0, 1, 3, 0] },
            'Asus2': { frets: [-1, 0, 2, 2, 0, 0], fingers: [0, 0, 1, 2, 0, 0] }
        }
    }
};

export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function getChordNotes(chordType, rootNote) {
    const chord = CHORD_TYPES[chordType];
    if (!chord) return [];

    const rootIndex = NOTES.indexOf(rootNote);
    if (rootIndex === -1) return [];

    return chord.intervals.map((interval, i) => ({
        note: NOTES[(rootIndex + interval) % 12],
        interval: chord.intervalNames ? chord.intervalNames[i] : String(i + 1),
        isRoot: i === 0
    }));
}
