import { combineReducers } from 'redux';
import authsReducer from './AuthsModule';
import authReducer from './AuthModule';
import authOrderReducer from './AuthOrderModule';
import backlogReducer from './BacklogModule';
import taskReducer from './TaskModule';

const rootReducer = combineReducers({
  authReducer,
  authsReducer,
  taskReducer,
  authOrderReducer,
  backlogReducer,
});

export default rootReducer;