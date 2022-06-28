import { combineReducers } from 'redux';
import authsReducer from './AuthsModule';
import authReducer from './AuthModule';
import backlogReducer from './BacklogModule';

const rootReducer = combineReducers({
    authsReducer,
    authReducer,
    backlogReducer
});

export default rootReducer;