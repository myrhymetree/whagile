import { createActions, handleActions } from 'redux-actions';

/* 초기 값 */
const initialState = [];

/* 액션 */
export const GET_PROJECTS = 'project/GET_PROJECTS';

const actions = createActions({
    [GET_PROJECTS]: () => {}
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