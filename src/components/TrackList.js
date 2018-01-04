import React, { Component, PropTypes } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { connect } from 'react-redux';

import Track from './Track';
import { fetchLibrary } from '../logic/actions';

import TrackPlayer from 'react-native-track-player';

class TrackList extends Component {

    componentDidMount() {
        this.props.dispatch(fetchLibrary());
    }

    _keyExtractor(item) {
        return item.id;
    }

    _renderItem({item}) {
        return (
            <Track
                track={item}
                onPress={async () => {
                    // TODO sort out
                    console.log(item);
                    await TrackPlayer.setupPlayer({});
                    await TrackPlayer.add({ ...item });
                    TrackPlayer.play();
                }}
            />
        );
    }

    render() {
        if(this.props.fetching) {
            return (
                <ActivityIndicator
                    size="large"
                    color="#03A9F4"
                    style={{margin: 50}}
                />
            );
        }

        return (
            <FlatList
                data={this.props.tracks || []}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
            />
        );
    }

}

TrackList.propTypes = {
    tracks: PropTypes.array,
    fetching: PropTypes.bool,
    error: PropTypes.string,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        tracks: state.library.tracks,
        fetching: state.library.fetching,
        error: state.library.error
    };
}

module.exports = connect(mapStateToProps)(TrackList);
