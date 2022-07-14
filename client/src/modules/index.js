import { combineReducers } from 'redux';
import authsReducer from './AuthsModule';
import authReducer from './AuthModule';
import authOrderReducer from './AuthOrderModule';
import backlogReducer from './BacklogModule';
import projectsReducer from './ProjectModule';
import projectMemberReducer from './ProjectMemberModule';
import sprintBacklogsReducer from './SprintBacklogsModule';
import sprintTaskReducer from './SprintTaskModule';
import sprintsCountReducer from './SprintsCountModule';
import sprintsReducer from './SprintsModule';
import sprintReducer from './SprintModule';

const rootReducer = combineReducers({
    authsReducer,
    authReducer,
    authOrderReducer,
    backlogReducer,
    projectsReducer,
    projectMemberReducer,
    sprintBacklogsReducer,
    sprintTaskReducer,
    sprintsCountReducer,
    sprintsReducer,
    sprintReducer
});

export default rootReducer;