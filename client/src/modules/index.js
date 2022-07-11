import { combineReducers } from 'redux';
import authsReducer from './AuthsModule';
import authReducer from './AuthModule';
import authOrderReducer from './AuthOrderModule';
import backlogReducer from './BacklogModule';
import projectsReducer from './ProjectModule';
import projectMemberReducer from './ProjectMemberModule';
import tasksReducer from './TasksModule';
import taskReducer from './TaskModule';
import sprintsReducer from './SprintsModule';
import sprintReducer from './SprintModule';

const rootReducer = combineReducers({
    authsReducer,
    authReducer,
    authOrderReducer,
    backlogReducer,
    projectsReducer,
    projectMemberReducer,
    tasksReducer,
    taskReducer,
    sprintsReducer,
    sprintReducer
});

export default rootReducer;