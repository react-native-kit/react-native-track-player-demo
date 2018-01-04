import React, { PureComponent } from 'react';
import { AppState } from 'react-native';
import { Provider } from 'react-redux';
import TrackPlayer from 'react-native-track-player'; // TODO remove temp code

import { updatePlayback } from './logic/actions';
import Navigation from './screens/Navigation';

class App extends PureComponent {
    static store = null;

    async componentDidMount() {
        AppState.addEventListener('change', this._handleStateChange);

        // TODO remove temp code
        await TrackPlayer.setupPlayer({});
        TrackPlayer.updateOptions({
            capabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_SEEK_TO,
                TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
                TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS
            ]
        });
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleStateChange);
    }

    _handleStateChange(appState) {
        if(appState == 'active') {
            // Updates the playback information when the app is back from background mode
            App.store.dispatch(updatePlayback());
        }
    }

    render() {
        return (
            <Provider store={App.store}>
                <Navigation />
            </Provider>
        );
    }

}

module.exports = function(store) {
    App.store = store;
    return App;
};
