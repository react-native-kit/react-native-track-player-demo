import React, { Component, PropTypes } from 'react';
import {
    View, Text, Image, ImageBackground, TouchableOpacity,
    StyleSheet, StatusBar, Dimensions, Platform
} from 'react-native';
import { connect } from 'react-redux';
import TrackPlayer from 'react-native-track-player';

import ImageButton from '../components/ImageButton';
import ProgressBar from '../components/ProgressBar';

import { navigateTo } from '../logic/actions';

import iconArrow from '../icons/arrow.png';
import iconPlay from '../icons/play.png';
import iconPause from '../icons/pause.png';
import iconPrevious from '../icons/previous.png';
import iconNext from '../icons/next.png';

/**
 * A screen dedicated to show what is playing
 */
class NowPlayingScreen extends Component {

    _goBack() {
        this.props.dispatch(navigateTo('library'));
    }

    _playPause() {
        if(this.props.state == TrackPlayer.STATE_PAUSED) {
            TrackPlayer.play();
        } else {
            TrackPlayer.pause();
        }
    }

    async _previous() {
        // TODO add tracks to the queue
    }

    _next() {
        // TODO add tracks to the queue
    }

    render() {
        if(!this.props.track) {
            return (
                <View style={[styles.view, {justifyContent: 'center'}]}>
                    <Text style={{
                        color: '#ffffff',
                        fontWeight: '400',
                        fontSize: 20
                    }}>Unknown track</Text>
                </View>
            );
        }

        let {height, width} = Dimensions.get('window');
        let artworkHeight = height / 2;
        if(artworkHeight > width) artworkHeight = width;

        return (
            <View style={styles.view}>
                <StatusBar
                    translucent={true}
                    backgroundColor="rgba(0, 0, 0, 0)"
                />
                <ImageBackground
                    source={{uri: this.props.track.artwork}}
                    resizeMode="cover"
                    style={[styles.artwork, {height: artworkHeight}]}
                >
                    <View style={styles.header}>
                        <ImageButton
                            source={iconArrow}
                            onPress={this._goBack.bind(this)}
                            imageStyle={styles.headerIcon}
                        />
                        <Text style={styles.headerTitle}>Now Playing</Text>
                    </View>
                </ImageBackground>
                <View style={styles.info}>
                    <Text style={styles.title}>{this.props.track.title}</Text>
                    <Text style={styles.artist}>{this.props.track.artist}</Text>
                </View>
                <ProgressBar />
                <View style={styles.controls}>
                    <ImageButton
                        source={iconPrevious}
                        onPress={this._previous.bind(this)}
                        imageStyle={styles.controlIcon}
                    />
                    <ImageButton
                        source={this.props.state == TrackPlayer.STATE_PAUSED ? iconPlay : iconPause}
                        onPress={this._playPause.bind(this)}
                        style={styles.playPause}
                        imageStyle={styles.controlIcon}
                    />
                    <ImageButton
                        source={iconNext}
                        onPress={this._next.bind(this)}
                        imageStyle={styles.controlIcon}
                    />
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#2b2b2b'
    },
    artwork: {
        width: '100%',
        height: 200
    },
    artworkLandscape: {
        //TODO
    },
    header: {
        marginTop: Platform.OS == 'ios' ? 20 : 24,
        padding: 1,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerIcon: {
        width: 24,
        height: 24,
        margin: 15
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '400',
        color: '#ffffff',
        marginHorizontal: 16
    },
    info: {
        flexDirection: 'column',
        alignItems: 'center',
        margin: 20
    },
    title: {
        color: '#e6e6e6',
        fontSize: 19,
        fontWeight: '500'
    },
    artist: {
        color: '#9a9a9a',
        fontSize: 16,
        fontWeight: '400'
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 25
    },
    controlIcon: {
        width: 40,
        height: 40
    },
    playPause: {
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#ffffff',
        padding: 10,
        marginHorizontal: 15
    }
});

NowPlayingScreen.propTypes = {
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

module.exports = connect(mapStateToProps)(NowPlayingScreen);
