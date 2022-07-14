import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const FIND_BACKLOGS = 'backlog/FIND_BACKLOGS';
export const MORE_BACKLOGS = 'backlog/MORE_BACKLOGS';
export const FIND_FILTERED_BACKLOGS = 'backlog/FIND_FILTERED_BACKLOGS';

const actions = createActions({
    [FIND_BACKLOGS]: () => {},
    [MORE_BACKLOGS]: () => {},
    [FIND_FILTERED_BACKLOGS]: () => {}
});

/* 리듀서 */
const backlogReducer = handleActions(
    {
        [FIND_BACKLOGS]: (state, { payload }) => {
            return payload;
        }, 
        [MORE_BACKLOGS]: (state, { payload }) => {
            payload = state.concat(payload);
            return payload;
        },
        [FIND_FILTERED_BACKLOGS]: (state, { payload }) => {
            if(state.length > 0) {
                state = [];
            }
            return payload;
        }
    },
    initialState
);

export default backlogReducer;