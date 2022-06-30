import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_TASKS = "tasks/GET_TASKS";

const actions = createActions({
  [GET_TASKS]: () => {},
});

const TaskReducer = handleActions(
  {
    [GET_TASKS]: (state, { payload }) => {
      return { payload };
    },
  },
  initialState
);

export default TaskReducer;
