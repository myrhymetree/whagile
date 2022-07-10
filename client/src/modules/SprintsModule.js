import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_SPRINTS = 'sprints/GET_SPRINTS';

const actions = createActions({
    [GET_SPRINTS]: () => {},
});

/* 리듀서 */
const sprintsReducer = handleActions(
    {
        [GET_SPRINTS]: (state, { payload }) => {

            const newState = [];

            payload.map((p) => {

                    let startDate = new Date();
                    let endDate = new Date();

                    if(p.sprintStartDate && p.sprintEndDate) {
                        startDate = new Date(p.sprintStartDate);
                        endDate = new Date(p.sprintEndDate);
                    } else {
                        endDate.setDate(new Date().getDate() + 1);
                    }

                    newState.push({
                        id: p.sprintCode,
                        name: p.sprintName,
                        progress: 25,
                        type: "project",
                        start: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()),
                        end: new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()),
                        // start: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()),
                        // end: new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()),
                    });
                }
            )
            

            console.log('sprints: ', newState);

            return newState;
        },
    },
    initialState
);

export default sprintsReducer;