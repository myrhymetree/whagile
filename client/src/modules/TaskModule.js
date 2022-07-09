import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_TASK = "task/GET_TASK";
export const POST_TASK = "task/POST_TASK";


const actions = createActions({
  [GET_TASK]: () => {},
  [POST_TASK]: () => {},
});

const taskReducer = handleActions(
  {
    [GET_TASK]: (state, { payload }) => {
      return payload;
    },
    [POST_TASK]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default taskReducer;
