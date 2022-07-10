import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const FIND_BACKLOG_DETAILS = 'backlog/FIND_BACKLOG_DETAILS';
export const MODIFY_BACKLOG = 'backlog/MODIFY_BACKLOG';
export const DELETE_BACKLOG = 'backlog/DELETE_BACKLOG';

const actions = createActions({
    [FIND_BACKLOG_DETAILS]: () => {}, 
    [MODIFY_BACKLOG]: () => {},
    [DELETE_BACKLOG]: () => {}
});

/* 리듀서 */
const backlogDetailReducer = handleActions(
    {
        [FIND_BACKLOG_DETAILS]: (state, { payload }) => {
            console.log('####################')
            console.log(payload)
            return payload;
        },
        [MODIFY_BACKLOG]: (state, { payload }) => {
            console.log('백로그 수정 payload: ', payload)
            return payload;
        }, 
        [DELETE_BACKLOG]: (state, { payload }) => {
            console.log('백로그 삭제 payload: ', payload)
            return payload;
        }
    },
    initialState
);

export default backlogDetailReducer;