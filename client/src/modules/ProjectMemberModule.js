import { createActions, handleActions } from 'redux-actions';

/* 초기 값 */
const initialState = [];

/* 액션 */
export const GET_PROJECT_MEMBER = 'projectMember/GET_PROJECT_MEMBER';
export const DELETE_PROJECT_MEMBER = 'projectMember/DELETE_PROJECT_MEMBER';

const actions = createActions({

    [GET_PROJECT_MEMBER]: () => {},
    [DELETE_PROJECT_MEMBER]: () => {}
});

/* 리듀서 */
export const projectMemberReducer = handleActions(
    {
        [GET_PROJECT_MEMBER]: (state, { payload }) => {
            return payload;
        },
        [DELETE_PROJECT_MEMBER]: (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default projectMemberReducer;