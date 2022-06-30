import { combineReducers } from 'redux';
import authReducer from './AuthModule';
import backlogReducer from './BacklogModule';
import taskReducer from './TaskModule';

const rootReducer = combineReducers({
    authReducer,
    backlogReducer,
    taskReducer,
});

export default rootReducer;