import { createActions, handleActions } from 'redux-actions';

/* 초기 값 */
const initialState = [];

/* 액션 */
export const GET_PROJECT_NOTICE = 'projects/GET_PROJECT_NOTICE';


const actions = createActions({
    [GET_PROJECT_NOTICE]: () => {}
});

/* 리듀서 */
const ProjectNoticeReducer = handleActions(
    {
        [GET_PROJECT_NOTICE]: (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default ProjectNoticeReducer;