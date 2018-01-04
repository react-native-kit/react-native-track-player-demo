import { Alert } from 'react-native';
import TrackPlayer from 'react-native-track-player';

import { playbackState, playbackTrack } from './actions';

async function eventHandler(store, data) {
    switch(data.type) {

        // Forward remote events to the player
        case 'remote-play':
            TrackPlayer.play();
            break;
        case 'remote-pause':
            TrackPlayer.pause();
            break;
        case 'remote-stop':
            TrackPlayer.stop();
            break;
        case 'remote-next':
            TrackPlayer.skipToNext();
            break;
        case 'remote-previous':
            TrackPlayer.skipToPrevious();
            break;
        case 'remote-seek':
            TrackPlayer.seekTo(data.position);
            break;

        // You can make ducking smoother by adding a fade in/out
        case 'remote-duck':
            TrackPlayer.setVolume(data.ducking ? 0.5 : 1);
            break;

        // Playback updates
        case 'playback-state':
            store.dispatch(playbackState(data.state));
            break;
        case 'playback-track-changed':
            store.dispatch(playbackTrack(data.nextTrack));
            break;
        case 'playback-error':
            Alert.alert('An error ocurred', data.error);
            break;
    }
};

module.exports = function(store) {
    return eventHandler.bind(null, store);
};
