import { combineReducers } from 'redux';
import authsReducer from './AuthsModule';
import authReducer from './AuthModule';
import authOrderReducer from './AuthOrderModule';
import backlogReducer from './BacklogModule';

const rootReducer = combineReducers({
    authsReducer,
    authReducer,
    authOrderReducer,
    backlogReducer
});

export default rootReducer;