import { combineReducers } from 'redux';
import authsReducer from './AuthsModule';
import authReducer from './AuthModule';
import authOrderReducer from './AuthOrderModule';
import backlogReducer from './BacklogModule';
<<<<<<< HEAD
import taskReducer from './TaskModule';
import cards from '../components/items/kanban/reducers/card_reducer';
import modal from '../components/items/kanban/reducers/modal_reducer';
import draft from '../components/items/kanban/reducers/draft_reducer';

const rootReducer = combineReducers({
  authReducer,
  authsReducer,
  taskReducer,
  authOrderReducer,
  backlogReducer,
  cards,
  modal,
  draft,
=======
import projectsReducer from './ProjectModules';

const rootReducer = combineReducers({
    authsReducer,
    authReducer,
    authOrderReducer,
    backlogReducer,
    projectsReducer
>>>>>>> 04e74ad9854feeea9d740be79f1c036bad550cf0
});

export default rootReducer;
