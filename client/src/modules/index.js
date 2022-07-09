import { combineReducers } from 'redux';
import authsReducer from './AuthsModule';
import authReducer from './AuthModule';
import authOrderReducer from './AuthOrderModule';
import backlogReducer from './BacklogModule';
import backlogDetailReducer from './BacklogDetailModule';
import backlogCommentReducer from './BacklogCommentModule';
import projectsReducer from './ProjectModule';
import projectMemberReducer from './ProjectMemberModule';

const rootReducer = combineReducers({
    authsReducer,
    authReducer,
    authOrderReducer,
    backlogReducer,
    backlogDetailReducer,
    backlogCommentReducer,
    projectsReducer,
    projectMemberReducer
});

export default rootReducer;