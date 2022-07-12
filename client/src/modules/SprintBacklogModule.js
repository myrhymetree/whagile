import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_BACKLOGS = 'sprintBacklog/GET_BACKLOGS';

const actions = createActions({
    [GET_BACKLOGS]: () => {},
});

/* 리듀서 */
const sprintBacklogReducer = handleActions(
    {
        [GET_BACKLOGS]: (state, { payload }) => {
            console.log(999999, payload)
            return payload;
        }
    },
    initialState
);

export default sprintBacklogReducer;