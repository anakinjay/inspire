import {combineReducers} from 'redux';
import appReducer from './reducers/appReducer';
import progressionReducer from './reducers/progressionReducer.js';
import scaleReducer from './reducers/scaleReducer.js';

const rootReducer = combineReducers({scale:scaleReducer, app:appReducer, progression:progressionReducer});
export default rootReducer;