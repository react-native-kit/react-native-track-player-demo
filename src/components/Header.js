import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, StatusBar, Platform } from 'react-native';
import { CastButton } from 'react-native-track-player';

class Header extends PureComponent {

    render() {
        return (
            <View style={styles.bar}>
                <StatusBar
                    backgroundColor="#0288D1"
                    barStyle="light-content"
                />
                <Text style={styles.title}>Demo App</Text>
                <CastButton color="#ffffff" />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#03A9F4',
        height: 56,
        elevation: 5,
        borderTopWidth: Platform.OS == 'ios' ? 20 : 0,
        borderTopColor: '#0288D1'
    },
    title: {
        flex: 1,
        fontSize: 20,
        fontWeight: '500',
        color: '#ffffff',
        paddingLeft: 16,
        paddingRight: 16
    }
});

module.exports = Header;
