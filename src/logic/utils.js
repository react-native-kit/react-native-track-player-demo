// This provider is from Google's UniversalMusicPlayer demo for Android
const base = 'http://storage.googleapis.com/automotive-media/';
const catalog = 'music.json';

/**
 * Load tracks from Google's demo provider
 */
export async function loadTracks() {
    let response = await fetch(base + catalog);
    let json = await response.json();
    let data = [];

    for(let i = 0; i < json.music.length; i++) {
        let track = json.music[i];
        // Parse the JSON into Track Structures
        // https://github.com/react-native-kit/react-native-track-player/wiki/Documentation#track-structure
        data.push({
            id: track.source,
            url: base + track.source,
            artwork: base + track.image,
            duration: track.duration,

            title: track.title,
            artist: track.artist,
            album: track.album,
            genre: track.genre
        });
    }

    return data;
}

function formatTwoDigits(n) {
    return n < 10 ? '0' + n : n;
}

/**
 * Format time to "HH:mm:ss" or "mm:ss"
 */
export function formatTime(seconds) {
    const ss = Math.floor(seconds) % 60;
    const mm = Math.floor(seconds / 60) % 60;
    const hh = Math.floor(seconds / 3600);

    if(hh > 0) {
        return hh + ':' + formatTwoDigits(mm) + ':' + formatTwoDigits(ss);
    } else {
        return mm + ':' + formatTwoDigits(ss);
    }
}
