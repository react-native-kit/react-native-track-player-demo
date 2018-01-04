import TrackPlayer from 'react-native-track-player';
import { loadTracks } from './utils';

export const UPDATE_LIBRARY = 'UPDATE_LIBRARY';
export const LIBRARY_STATUS = 'LIBRARY_STATUS';

export const PLAYBACK_INIT = 'PLAYBACK_INIT';
export const PLAYBACK_STATE = 'PLAYBACK_STATE';
export const PLAYBACK_TRACK = 'PLAYBACK_TRACK';

export const NAVIGATE_TO = 'NAVIGATE_TO';

function libraryStatus(fetching, error) {
    return {
        type: LIBRARY_STATUS,
        fetching: fetching,
        error: error
    };
}

export function fetchLibrary() {
    return (dispatch, getState) => {

        let state = getState();
        if(state.library && (state.library.fetching || state.library.tracks)) {
            // Already fetching or fetched
            return;
        }

        dispatch(libraryStatus(true));

        loadTracks().then((data) => {
            dispatch({
                type: UPDATE_LIBRARY,
                tracks: data
            });
        }, (error) => {
            dispatch(libraryStatus(false, error));
        });

    };
}

export function initializePlayback() {//TODO
    return async (dispatch, getState) => {
        await TrackPlayer.setupPlayer({
            maxCacheSize: 1024 * 5 // 5 mb
        });
        dispatch({
            type: PLAYBACK_INIT
        });
    };
}

export function playbackState(state) {
    return {
        type: PLAYBACK_STATE,
        state: state
    };
}

export function playbackTrack(track) {
    return {
        type: PLAYBACK_TRACK,
        track: track
    };
}

export function updatePlayback() {
    return async (dispatch, getState) => {
        try {
            dispatch(playbackState(await TrackPlayer.getState()));
            dispatch(playbackTrack(await TrackPlayer.getCurrentTrack()));
        } catch(e) {
            // The player is probably not yet initialized
            // which means we don't have to update anything
        }
    };
}

export function navigateTo(screenName) {
    return {
        type: NAVIGATE_TO,
        currentScreen: screenName
    };
}
