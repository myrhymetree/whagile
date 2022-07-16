import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_SPRINT = "tasksSprint/GET_SPRINT";


const actions = createActions({
  [GET_SPRINT]: () => {}
});

const tasksSprintReducer = handleActions(
  {
    [GET_SPRINT]: (state, { payload }) => {
        
      return payload;
    },
  },
  initialState
);

export default tasksSprintReducer;
