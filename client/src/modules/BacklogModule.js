import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const FIND_BACKLOGS = 'backlog/FIND_BACKLOGS';

const actions = createActions({
    [FIND_BACKLOGS]: () => {}
});

/* 리듀서 */
const backlogReducer = handleActions(
    {
        [FIND_BACKLOGS]: (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default backlogReducer;