// ====================================
// Triad Definitions
// ====================================

export const TRIAD_TYPES = {
    'major': {
        name: '메이저 트라이어드',
        nameEn: 'Major Triad',
        symbol: '',
        intervals: [0, 4, 7],
        intervalNames: ['1', '3', '5'],
        description: '밝고 안정적인 소리. 가장 기본적인 코드 형태입니다.',
        usage: '팝, 록, 발라드 등 대부분의 장르'
    },
    'minor': {
        name: '마이너 트라이어드',
        nameEn: 'Minor Triad',
        symbol: 'm',
        intervals: [0, 3, 7],
        intervalNames: ['1', 'b3', '5'],
        description: '슬프고 어두운 느낌. 감성적인 표현에 사용됩니다.',
        usage: '발라드, 록, R&B'
    },
    'diminished': {
        name: '디미니쉬드 트라이어드',
        nameEn: 'Diminished Triad',
        symbol: 'dim',
        intervals: [0, 3, 6],
        intervalNames: ['1', 'b3', 'b5'],
        description: '불안정하고 긴장감 있는 소리. 경과 코드로 많이 사용됩니다.',
        usage: '재즈, 클래식, 경과 코드'
    },
    'augmented': {
        name: '어그먼티드 트라이어드',
        nameEn: 'Augmented Triad',
        symbol: 'aug',
        intervals: [0, 4, 8],
        intervalNames: ['1', '3', '#5'],
        description: '신비롭고 몽환적인 소리. 도미넌트 대리 코드로 사용됩니다.',
        usage: '재즈, 네오소울, 프로그레시브'
    }
};

// Triad voicings on different string sets
export const TRIAD_VOICINGS = {
    // Root position voicings (1-3-5)
    'root': {
        name: '루트 포지션',
        description: '루트가 가장 낮은 음',
        // String sets: [6-5-4], [5-4-3], [4-3-2], [3-2-1]
        positions: {
            'major': [
                { strings: [6, 5, 4], frets: [0, 2, 2], fingers: [1, 2, 3] },
                { strings: [5, 4, 3], frets: [0, 2, 1], fingers: [1, 3, 2] },
                { strings: [4, 3, 2], frets: [0, 1, 0], fingers: [0, 1, 0] },
                { strings: [3, 2, 1], frets: [0, 0, 1], fingers: [0, 0, 1] }
            ],
            'minor': [
                { strings: [6, 5, 4], frets: [0, 2, 1], fingers: [1, 3, 2] },
                { strings: [5, 4, 3], frets: [0, 1, 1], fingers: [1, 2, 3] },
                { strings: [4, 3, 2], frets: [0, 1, 0], fingers: [0, 1, 0] },
                { strings: [3, 2, 1], frets: [0, 0, 0], fingers: [0, 0, 1] }
            ]
        }
    },
    // First inversion (3-5-1)
    'first': {
        name: '1전위',
        description: '3도가 가장 낮은 음'
    },
    // Second inversion (5-1-3)
    'second': {
        name: '2전위',
        description: '5도가 가장 낮은 음'
    }
};

export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function getTriadNotes(triadType, rootNote) {
    const triad = TRIAD_TYPES[triadType];
    if (!triad) return [];

    const rootIndex = NOTES.indexOf(rootNote);
    if (rootIndex === -1) return [];

    return triad.intervals.map((interval, i) => ({
        note: NOTES[(rootIndex + interval) % 12],
        interval: triad.intervalNames[i],
        isRoot: i === 0
    }));
}
