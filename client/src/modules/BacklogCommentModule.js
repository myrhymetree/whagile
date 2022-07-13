import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const FIND_BACKLOG_COMMENTS = 'backlogComment/FIND_BACKLOG_COMMENTS';

const actions = createActions({
    [FIND_BACKLOG_COMMENTS]: () => {}
});

/* 리듀서 */
const backlogCommentReducer = handleActions(
    {
        [FIND_BACKLOG_COMMENTS]: (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default backlogCommentReducer;