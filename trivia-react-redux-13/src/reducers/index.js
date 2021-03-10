import { combineReducers } from 'redux';
import data from './reducerData';
import token from './reducerToken';
import player from './reducerPlayer';

const rootReducers = combineReducers({ token, data, player });

export default rootReducers;
