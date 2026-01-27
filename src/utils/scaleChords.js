import { NOTES, SCALE_DEFINITIONS } from '../data/scales.js';

const PRIMARY_CHORD_TYPES = [
    { suffix: '', intervals: [0, 4, 7] },
    { suffix: 'm', intervals: [0, 3, 7] },
    { suffix: 'dim', intervals: [0, 3, 6] },
    { suffix: 'maj7', intervals: [0, 4, 7, 11] },
    { suffix: '7', intervals: [0, 4, 7, 10] },
    { suffix: 'm7', intervals: [0, 3, 7, 10] },
    { suffix: 'm7b5', intervals: [0, 3, 6, 10] }
];

const SECONDARY_CHORD_TYPES = [
    { suffix: 'sus2', intervals: [0, 2, 7] },
    { suffix: 'sus4', intervals: [0, 5, 7] },
    { suffix: '5', intervals: [0, 7] }
];

function getScaleNoteList(scaleName, rootNote) {
    const scale = SCALE_DEFINITIONS[scaleName];
    if (!scale) return [];

    const rootIndex = NOTES.indexOf(rootNote);
    if (rootIndex === -1) return [];

    const notes = scale.intervals.map((interval) => NOTES[(rootIndex + interval) % 12]);
    const uniqueNotes = [];
    const seen = new Set();

    notes.forEach((note) => {
        if (seen.has(note)) return;
        seen.add(note);
        uniqueNotes.push(note);
    });

    return uniqueNotes;
}

function toPitchClassSet(notes) {
    return new Set(notes.map((note) => NOTES.indexOf(note)).filter((idx) => idx >= 0));
}

function chordFitsScale(rootNote, chordIntervals, scalePitchClasses) {
    const rootIndex = NOTES.indexOf(rootNote);
    if (rootIndex === -1) return false;

    for (const interval of chordIntervals) {
        const pitchClass = (rootIndex + interval) % 12;
        if (!scalePitchClasses.has(pitchClass)) {
            return false;
        }
    }

    return true;
}

function buildChordList(scaleNotes, chordTypes) {
    const scalePitchClasses = toPitchClassSet(scaleNotes);
    const chords = [];
    const seen = new Set();

    for (const rootNote of scaleNotes) {
        for (const chordType of chordTypes) {
            if (!chordFitsScale(rootNote, chordType.intervals, scalePitchClasses)) {
                continue;
            }
            const label = `${rootNote}${chordType.suffix}`;
            if (seen.has(label)) continue;
            seen.add(label);
            chords.push(label);
        }
    }

    return chords;
}

export function getCompatibleChords(scaleName, rootNote) {
    const scaleNotes = getScaleNoteList(scaleName, rootNote);
    if (scaleNotes.length === 0) {
        return { scaleNotes: [], primaryChords: [], secondaryChords: [] };
    }

    const primaryChords = buildChordList(scaleNotes, PRIMARY_CHORD_TYPES);
    const secondaryChords = buildChordList(scaleNotes, SECONDARY_CHORD_TYPES);

    return { scaleNotes, primaryChords, secondaryChords };
}
