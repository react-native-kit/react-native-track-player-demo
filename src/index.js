import { AppRegistry } from 'react-native';
import TrackPlayer from 'react-native-track-player';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import createApp from './App';
import createEventHandler from './logic/event-handler';

import reducers from './logic/reducers';

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

AppRegistry.registerComponent('TrackPlayerDemo', () => createApp(store));
TrackPlayer.registerEventHandler(createEventHandler(store));
