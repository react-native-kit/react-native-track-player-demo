import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import TrackPlayer, { ProgressComponent } from 'react-native-track-player';

import { navigateTo } from '../logic/actions';

import iconPlay from '../icons/play.png';
import iconPause from '../icons/pause.png';

class MiniPlayer extends ProgressComponent {

    _openNowPlaying() {
        this.props.dispatch(navigateTo('now-playing'));
    }

    _togglePlayPause() {
        if(this.props.state == TrackPlayer.STATE_PAUSED) {
            TrackPlayer.play();
        } else {
            TrackPlayer.pause();
        }
    }

    render() {
        if(!this.props.track || this.props.state == TrackPlayer.STATE_NONE || this.props.state == TrackPlayer.STATE_STOPPED) {
            return <View />;
        }

        return (
            <View style={styles.player}>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.wide} onPress={this._openNowPlaying.bind(this)}>
                        <View style={styles.metadata}>
                            <Image
                                source={{uri: this.props.track.artwork}}
                                style={styles.artwork}
                            />
                            <View style={styles.info}>
                                <Text style={styles.title}>{this.props.track.title}</Text>
                                <Text style={styles.artist}>{this.props.track.artist}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._togglePlayPause.bind(this)}>
                        <Image
                            source={this.props.state == TrackPlayer.STATE_PAUSED ? iconPlay : iconPause}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
                <View
                    style={[
                        {width: (this.getProgress() * 100) + '%'},
                        styles.bar
                    ]}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    player: {
        elevation: 5,
        backgroundColor: '#424141'
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bar: {
        height: 2,
        backgroundColor: '#03A9F4'
    },
    wide: {
        flex: 1
    },
    metadata: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    artwork: {
        width: 50,
        height: 50,
        margin: 10
    },
    info: {
        paddingLeft: 5,
        paddingRight: 5
    },
    title: {
        color: '#e6e6e6',
        fontSize: 16,
        fontWeight: '500'
    },
    artist: {
        color: '#9a9a9a',
        fontSize: 14,
        fontWeight: '300'
    },
    icon: {
        height: 50,
        width: 50,
        margin: 10
    }
});

MiniPlayer.propTypes = {
    state: PropTypes.number,
    track: PropTypes.object
};

function mapStateToProps(state) {
    const currentTrack = state.playback.currentTrack;
    const tracks = state.library.tracks;

    return {
        state: state.playback.state,
        track: tracks ? tracks.find((track) => track.id == currentTrack) : null
    };
}

module.exports = connect(mapStateToProps)(MiniPlayer);
