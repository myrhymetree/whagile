import { combineReducers } from 'redux';
import authsReducer from './AuthsModule';
import authReducer from './AuthModule';
import authOrderReducer from './AuthOrderModule';
import backlogReducer from './BacklogModule';
import projectsReducer from './ProjectModules';
import sprintsReducer from './SprintsModule';
import sprintReducer from './SprintModule';

const rootReducer = combineReducers({
    authsReducer,
    authReducer,
    authOrderReducer,
    backlogReducer,
    projectsReducer,
    sprintsReducer,
    sprintReducer
});

export default rootReducer;