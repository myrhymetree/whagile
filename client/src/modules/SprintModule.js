import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_SPRINT = 'sprint/GET_SPRINT';
export const SET_SPRINT = 'sprint/SET_SPRINT';
export const INIT_SPRINT = 'sprint/INIT_SPRINT';

const actions = createActions({
    [GET_SPRINT]: () => {},
    [SET_SPRINT]: () => {},
    [INIT_SPRINT]: () => {},
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
            console.log('sprint: ', newState)
            return newState;
        },
        [SET_SPRINT]: (state, { payload }) => {
            
            return payload;
        },
        [INIT_SPRINT]: (state, { payload }) => {
            
            return {};
        }
    },
    initialState
);

export default sprintReducer;