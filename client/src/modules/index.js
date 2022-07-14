import { combineReducers } from 'redux';
import authsReducer from './AuthsModule';
import authReducer from './AuthModule';
import authOrderReducer from './AuthOrderModule';
import backlogReducer from './BacklogModule';
import projectsReducer from './ProjectModule';
import projectMemberReducer from './ProjectMemberModule';
import memberReducer from './MemberModule';

const rootReducer = combineReducers({
    authsReducer,
    authReducer,
    authOrderReducer,
    memberReducer,
    backlogReducer,
    projectsReducer,
    projectMemberReducer
});

export default rootReducer;