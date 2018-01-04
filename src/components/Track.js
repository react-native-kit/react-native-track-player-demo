import React, { PureComponent, PropTypes } from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

class Track extends PureComponent {

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={styles.track}>
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
        );
    }

}

Track.propTypes = {
    track: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    track: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    artwork: {
        width: 50,
        height: 50
    },
    info: {
        paddingLeft: 10,
        paddingRight: 10
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
    }
});

module.exports = Track;
