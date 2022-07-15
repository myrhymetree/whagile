import { combineReducers } from 'redux';
import authsReducer from './AuthsModule';
import authReducer from './AuthModule';
import authOrderReducer from './AuthOrderModule';
import backlogReducer from './BacklogModule';
import backlogDetailReducer from './BacklogDetailModule';
import backlogCommentReducer from './BacklogCommentModule';
import backlogCommentDetailReducer from './BacklogCommentDetailModule';
import projectsReducer from './ProjectModule';
import projectMemberReducer from './ProjectMemberModule';
import ProjectNoticeReducer from './ProjectNoticeModule';
import projectStatisticsReducer from './ProjectStatisticsModule';
import memberReducer from './MemberModule';
import tasksReducer from './TasksModule';
import taskReducer from './TaskModule';
import sprintBacklogsReducer from './SprintBacklogsModule';
import sprintTaskReducer from './SprintTaskModule';
import sprintsCountReducer from './SprintsCountModule';
import sprintsReducer from './SprintsModule';
import sprintReducer from './SprintModule';

const rootReducer = combineReducers({
    authsReducer,
    authReducer,
    authOrderReducer,
    memberReducer,
    backlogReducer,
    backlogDetailReducer,
    backlogCommentReducer,
    backlogCommentDetailReducer,
    projectsReducer,
    projectMemberReducer,
    ProjectNoticeReducer,
    projectStatisticsReducer,
    tasksReducer,
    taskReducer,
    sprintBacklogsReducer,
    sprintTaskReducer,
    sprintsCountReducer,
    sprintsReducer,
    sprintReducer
});

export default rootReducer;
