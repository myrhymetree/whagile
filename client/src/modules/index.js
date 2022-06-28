import { combineReducers } from 'redux';
import authReducer from './AuthModule';
import backlogReducer from './BacklogModule';

const rootReducer = combineReducers({
    authReducer,
    backlogReducer
});

export default rootReducer;