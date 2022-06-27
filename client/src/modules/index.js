import { combineReducers } from 'redux';
import backlogReducer from './BacklogModule';

const rootReducer = combineReducers({
    backlogReducer
});

export default rootReducer;