// ====================================
// Scale Definitions
// ====================================

export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Standard tuning: E A D G B E (from 6th to 1st string)
export const STANDARD_TUNING = ['E', 'A', 'D', 'G', 'B', 'E'];

// Scale intervals (in semitones from root)
export const SCALE_DEFINITIONS = {
    'minor-pentatonic': {
        name: '마이너 펜타토닉',
        nameEn: 'Minor Pentatonic',
        intervals: [0, 3, 5, 7, 10],
        intervalNames: ['1', 'b3', '4', '5', 'b7'],
        genres: '록, 블루스, 팝, 메탈',
        stage: 1,
        description: '마이너 펜타토닉은 5개의 음으로 구성된 스케일로, 일렉기타 입문자가 가장 먼저 배워야 할 스케일입니다. 록이나 블루스 솔로 연주에 즉시 활용 가능하며, 실수할 확률이 적어 즉흥 연주에 적합합니다.'
    },
    'major': {
        name: '메이저 스케일',
        nameEn: 'Major Scale (Ionian)',
        intervals: [0, 2, 4, 5, 7, 9, 11],
        intervalNames: ['1', '2', '3', '4', '5', '6', '7'],
        genres: '팝, 컨트리, 재즈, 클래식',
        stage: 1,
        description: '모든 음악 이론의 기준이 되는 스케일입니다. 도레미파솔라시도의 간격을 손가락으로 익히며 지판의 구조를 이해하는 데 필수적입니다. 밝고 행복한 느낌을 줍니다.'
    },
    'blues': {
        name: '블루스 스케일',
        nameEn: 'Blues Scale',
        intervals: [0, 3, 5, 6, 7, 10],
        intervalNames: ['1', 'b3', '4', 'b5', '5', 'b7'],
        blueNoteIndex: 3, // b5 is the blue note
        genres: '블루스, 록, 재즈, 펑크',
        stage: 2,
        description: '마이너 펜타토닉에 블루 노트(b5)를 추가한 스케일입니다. 이 음 하나로 기타 특유의 끈적하고 거친 느낌을 낼 수 있습니다. 벤딩과 함께 사용하면 더욱 효과적입니다.'
    },
    'natural-minor': {
        name: '내추럴 마이너',
        nameEn: 'Natural Minor (Aeolian)',
        intervals: [0, 2, 3, 5, 7, 8, 10],
        intervalNames: ['1', '2', 'b3', '4', '5', 'b6', 'b7'],
        genres: '발라드, 록, 메탈, 클래식',
        stage: 2,
        description: '슬프고 서정적인 느낌을 주는 스케일입니다. 메이저 스케일과 나란한조(Relative Key) 관계를 이해하면 암기량을 절반으로 줄일 수 있습니다. A 마이너 = C 메이저와 같은 구성음을 가집니다.'
    },
    'major-pentatonic': {
        name: '메이저 펜타토닉',
        nameEn: 'Major Pentatonic',
        intervals: [0, 2, 4, 7, 9],
        intervalNames: ['1', '2', '3', '5', '6'],
        genres: '팝, 컨트리, 펑크, 록',
        stage: 3,
        description: '밝고 경쾌한 느낌을 주는 스케일입니다. 마이너 펜타토닉과 손가락 모양은 같지만 으뜸음(Root)의 위치가 다릅니다. 팝이나 컨트리 음악의 솔로에서 많이 사용됩니다.'
    },
    'harmonic-minor': {
        name: '하모닉 마이너',
        nameEn: 'Harmonic Minor',
        intervals: [0, 2, 3, 5, 7, 8, 11],
        intervalNames: ['1', '2', 'b3', '4', '5', 'b6', '7'],
        genres: '네오 클래시컬, 메탈, 플라멩코',
        stage: 3,
        description: '내추럴 마이너의 7번째 음을 반음 올린 스케일입니다. 클래식한 느낌이나 잉베이 맘스틴 같은 네오 클래시컬 메탈에서 많이 사용됩니다. 독특한 이국적인 분위기를 냅니다.'
    },
    'dorian': {
        name: '도리안 모드',
        nameEn: 'Dorian Mode',
        intervals: [0, 2, 3, 5, 7, 9, 10],
        intervalNames: ['1', '2', 'b3', '4', '5', '6', 'b7'],
        genres: '펑크, 재즈, 퓨전',
        stage: 3,
        description: '마이너 스케일의 느낌이지만 6번째 음이 메이저라 밝은 요소가 있습니다. Carlos Santana가 즐겨 사용하며, 펑크나 퓨전 재즈에서 많이 활용됩니다.'
    },
    'mixolydian': {
        name: '믹솔리디안 모드',
        nameEn: 'Mixolydian Mode',
        intervals: [0, 2, 4, 5, 7, 9, 10],
        intervalNames: ['1', '2', '3', '4', '5', '6', 'b7'],
        genres: '블루스 록, 펑크, 컨트리',
        stage: 3,
        description: '메이저 스케일의 7번째 음을 반음 내린 스케일입니다. 도미넌트 7th 코드 위에서 연주할 때 완벽하게 어울리며, 밝으면서도 블루지한 느낌을 줍니다.'
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
