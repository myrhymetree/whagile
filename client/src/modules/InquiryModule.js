import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const FIND_INQUIRY = 'inquiry/FIND_INQUIRY';
export const REGIST_INQUIRY = 'inquiry/REGIST_INQUIRY';
export const UPDATE_INQUIRY = 'inquiry/UPDATE_INQUIRY';
export const REMOVE_INQUIRY = 'inquiry/REMOVE_INQUIRY';

const actions = createActions({
    [FIND_INQUIRY]: () => {},
    [REGIST_INQUIRY]: () => {},
    [UPDATE_INQUIRY]: () => {},
    [REMOVE_INQUIRY]: () => {},
});

/* 리듀서 */
const inquiryReducer = handleActions(
    {
        [FIND_INQUIRY]: (state, { payload }) => {
            return payload;
        },
        [REGIST_INQUIRY]: (state, { payload }) => {
            return payload;
        },
        [UPDATE_INQUIRY]: (state, { payload }) => {
            return payload;
        },
        [REMOVE_INQUIRY]: (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default inquiryReducer;