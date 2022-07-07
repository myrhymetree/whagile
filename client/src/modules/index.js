import { combineReducers } from 'redux';
import authsReducer from './AuthsModule';
import authReducer from './AuthModule';
import authOrderReducer from './AuthOrderModule';
import backlogReducer from './BacklogModule';
import projectsReducer from './ProjectModule';
import projectMemberReducer from './ProjectMemberModule';
import TasksReducer from './TaskModule';

const rootReducer = combineReducers({
    authsReducer,
    authReducer,
    authOrderReducer,
    backlogReducer,
    projectsReducer,
    projectMemberReducer,
    TasksReducer
});

export default rootReducer;