import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const FIND_INQUIRIES = 'inquiry/FIND_INQUIRIES';
export const INIT_INQUIRIES = 'inquiry/INIT_INQUIRIES';

const actions = createActions({
    [FIND_INQUIRIES]: () => {},
    [INIT_INQUIRIES]: () => {}
});

/* 리듀서 */
const inquiriesReducer = handleActions(
    {
        [FIND_INQUIRIES]: (state, { payload }) => {
            console.log('find inquiries...', payload);
            return payload;
        },
        [INIT_INQUIRIES]: (state, { payload }) => {
            state = initialState;    //초기 state값으로 clean up 한다
            return state;
        }
    },
    initialState
);

export default inquiriesReducer;