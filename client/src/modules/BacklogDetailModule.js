import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const FIND_BACKLOG_DETAILS = 'backlog/FIND_BACKLOG_DETAILS';

const actions = createActions({
    [FIND_BACKLOG_DETAILS]: () => {}
});

/* 리듀서 */
const backlogDetailReducer = handleActions(
    {
        [FIND_BACKLOG_DETAILS]: (state, { payload }) => {
            console.log('####################')
            console.log(payload)
            return payload;
        }
    },
    initialState
);

export default backlogDetailReducer;