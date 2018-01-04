import { combineReducers } from 'redux';
import {
    UPDATE_LIBRARY,
    LIBRARY_STATUS,
    PLAYBACK_INIT,
    PLAYBACK_STATE,
    PLAYBACK_TRACK,
    NAVIGATE_TO
} from './actions';

function libraryReducer(state = {}, action) {
    switch(action.type) {
        case UPDATE_LIBRARY:
            return {
                ...state,
                tracks: action.tracks,
                fetching: false,
                error: null
            };
        case LIBRARY_STATUS:
            return {
                ...state,
                fetching: action.fetching,
                error: action.error
            };
        default:
            return state;
    }
}

function playbackReducer(state = {}, action) {
    switch(action.type) {
        case PLAYBACK_INIT:
            return {
                ...state,
                init: true
            };
        case PLAYBACK_STATE:
            return {
                ...state,
                state: action.state
            };
        case PLAYBACK_TRACK:
            return {
                ...state,
                currentTrack: action.track
            };
        default:
            return state;
    }
}

function screenReducer(state = 'library', action) {
    switch(action.type) {
        case NAVIGATE_TO:
            return action.currentScreen;
        default:
            return state;
    }
}

module.exports = combineReducers({
    library: libraryReducer,
    playback: playbackReducer,
    currentScreen: screenReducer
});
