import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_AUTH = 'auth/GET_AUTH';
export const CHANGE_AUTH = 'auth/CHANGE_AUTH';
export const INIT_AUTH = 'auth/INIT_AUTH';

const actions = createActions({
    [GET_AUTH]: () => {},
    [CHANGE_AUTH]: () => {},
    [INIT_AUTH]: () => {}
});

/* 리듀서 */
const authReducer = handleActions(
    {
        [GET_AUTH]: (state, { payload }) => {
            return payload;
        },
        [CHANGE_AUTH]: (state, { payload }) => {
            return payload;
        },
        [INIT_AUTH]: (state, { payload }) => {
            return {
                authorityCode: '',
                authorityName: '',
                authorityDescription: '',
                authorityExposureOrder: '',
                authorityActivatedYn: 'N'
            };
        },
    },
    initialState
);

export default authReducer;