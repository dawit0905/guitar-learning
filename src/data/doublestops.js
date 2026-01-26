// ====================================
// Double Stop Definitions
// ====================================

export const DOUBLE_STOP_TYPES = {
    'thirds': {
        name: '3도 더블스탑',
        nameEn: 'Thirds',
        interval: 3, // Can be 3 or 4 semitones
        description: '가장 많이 사용되는 더블스탑. 화성적으로 풍부한 소리를 낸다.',
        usage: '멜로디 하모나이징, 리듬 기타, 솔로',
        examples: ['Chuck Berry 스타일 인트로', 'Allman Brothers 트윈 리드']
    },
    'sixths': {
        name: '6도 더블스탑',
        nameEn: 'Sixths',
        interval: 8, // Can be 8 or 9 semitones
        description: '부드럽고 감미로운 소리. 컨트리와 R&B에서 많이 사용.',
        usage: '멜로디 연주, 솔로 필인',
        examples: ['B.B. King 스타일', 'Steve Cropper 리듬']
    },
    'octaves': {
        name: '옥타브 더블스탑',
        nameEn: 'Octaves',
        interval: 12,
        description: 'Wes Montgomery 시그니처 사운드. 풍성하고 두꺼운 톤.',
        usage: '재즈 멜로디, 펑키 라인',
        examples: ['Wes Montgomery', 'George Benson']
    },
    'fourths': {
        name: '4도 더블스탑',
        nameEn: 'Fourths',
        interval: 5,
        description: '모던하고 열린 느낌. 재즈와 록에서 사용.',
        usage: '모던 보이싱, 앰비언트',
        examples: ['John Scofield', 'Modern Jazz']
    },
    'fifths': {
        name: '5도 더블스탑 (퍼펙트 피프스)',
        nameEn: 'Power Fifths',
        interval: 7,
        description: '록의 파워 코드 기본. 강렬하고 힘있는 소리.',
        usage: '록, 메탈 리프',
        examples: ['AC/DC', 'Metallica']
    }
};

// String pairs for double stops
export const STRING_PAIRS = [
    { strings: [1, 2], name: '1-2번줄' },
    { strings: [2, 3], name: '2-3번줄' },
    { strings: [3, 4], name: '3-4번줄' },
    { strings: [4, 5], name: '4-5번줄' },
    { strings: [5, 6], name: '5-6번줄' },
    { strings: [1, 3], name: '1-3번줄 (옥타브)' },
    { strings: [2, 4], name: '2-4번줄 (옥타브)' },
    { strings: [3, 5], name: '3-5번줄 (옥타브)' },
    { strings: [4, 6], name: '4-6번줄 (옥타브)' }
];

export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function getDoubleStopNotes(type, rootNote) {
    const doubleStop = DOUBLE_STOP_TYPES[type];
    if (!doubleStop) return [];

    const rootIndex = NOTES.indexOf(rootNote);
    if (rootIndex === -1) return [];

    const secondNote = NOTES[(rootIndex + doubleStop.interval) % 12];

    return [
        { note: rootNote, isRoot: true },
        { note: secondNote, isRoot: false }
    ];
}
