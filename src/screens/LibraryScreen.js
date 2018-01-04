import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';

import Header from '../components/Header';
import TrackList from '../components/TrackList';
import MiniPlayer from '../components/MiniPlayer';

/**
 * A screen that displays the track list and a mini player
 */
class LibraryScreen extends PureComponent {

    render() {
        return (
            <View style={styles.view}>
                <Header />
                <TrackList style={styles.list} />
                <MiniPlayer />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#333333'
    },
    list: {
        flex: 1
    }
});

module.exports = LibraryScreen;
