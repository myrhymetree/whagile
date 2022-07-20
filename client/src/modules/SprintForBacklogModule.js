import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const REGIST_SPRINT = 'backlog/REGIST_SPRINT';
export const MODIFY_SPRINT = 'backlog/MODIFY_SPRINT';

const actions = createActions({
    [REGIST_SPRINT]: () => {}, 
    [MODIFY_SPRINT]: () => {}
});

/* 리듀서 */
const sprintForBacklogReducer = handleActions(
    {
        [REGIST_SPRINT]: (state, { payload }) => {
            return payload;
        }, 
        [MODIFY_SPRINT]: (state, { payload }) => {
            return payload;
        }
    },
    initialState
);


export default sprintForBacklogReducer;