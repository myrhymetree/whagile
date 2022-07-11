import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_SPRINT = 'sprint/GET_SPRINT';

const actions = createActions({
    [GET_SPRINT]: () => {},
});

/* 리듀서 */
const sprintReducer = handleActions(
    {
        [GET_SPRINT]: (state, { payload }) => {
            
            let newState = {
                ...payload,
                'sprintStartDate': new Date(payload.sprintStartDate),
                'sprintEndDate': new Date(payload.sprintEndDate)
            }

            return newState;
        },
    },
    initialState
);

export default sprintReducer;