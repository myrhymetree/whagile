import { createActions, handleActions } from 'redux-actions';

/* 초기 값 */
const initialState = [];

/* 액션 */
export const GET_PROJECTS = 'project/GET_PROJECTS';
export const GET_PROJECT = 'project/GET_PROJECT';

const actions = createActions({
    [GET_PROJECTS]: () => {},
    [GET_PROJECT]: () => {}
});

/* 리듀서 */
const projectsReducer = handleActions(
    {
        [GET_PROJECTS]: (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default projectsReducer;