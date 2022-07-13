import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState =[];

/* 액션 */
export const REGIST_BACKLOG_COMMENT = 'backlogComment/REGIST_BACKLOG_COMMENT';

const actions = createActions({
    [REGIST_BACKLOG_COMMENT]: () => {}
});

/* 리듀서 */
const backlogCommentDetailReducer = handleActions(
    {
        [REGIST_BACKLOG_COMMENT]: (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default backlogCommentDetailReducer;