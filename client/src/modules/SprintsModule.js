import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_SPRINTS = 'sprints/GET_SPRINTS';
export const SET_COLLAPSED_SPRINTS = 'sprints/SET_COLLAPSED_SPRINTS';
export const UPDATE_TASKS_GANTT = 'sprints/UPDATE_TASKS_GANTT';
export const SET_COLLAPSED_ALL_SPRINTS = 'sprints/SET_COLLAPSED_ALL_SPRINTS';

const actions = createActions({
    [GET_SPRINTS]: () => {},
    [SET_COLLAPSED_SPRINTS]: () => {},
    [UPDATE_TASKS_GANTT]: () => {},
    [SET_COLLAPSED_ALL_SPRINTS]: () => {}
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
                    progress: 0,
                    type: "project",
                    start: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()),
                    end: new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()),
                    hideChildren: true,
                    progressStatus: p.sprintProgressStatus,
                    tasksCount: p.tasks.length
                });

                if(p.tasks.length > 0) {

                    p.tasks.map((t) => {
                        
                        let taskStartDate = startDate;
                        let taskEndDate = endDate;
                        
                        if(t.startDate && t.endDate) {
                            taskStartDate = new Date(t.startDate);
                            taskEndDate = new Date(t.endDate);
                        } else {
                            taskEndDate.setDate(taskStartDate.getDate() + 1);
                        }

                        newState.push({
                            id: `t${t.backlogCode}`, //sprint의 id와 구분하기위해 앞에 't'를 붙임
                            name: t.backlogTitle,
                            progress: 100,
                            type: "task",
                            start: new Date(taskStartDate.getFullYear(), taskStartDate.getMonth(), taskStartDate.getDate()),
                            end: new Date(taskEndDate.getFullYear(), taskEndDate.getMonth(), taskEndDate.getDate()),
                            project: p.sprintCode,
                            dependencies: [p.sprintCode]
                        });
                    })

                }
            })

            return newState;
        },
        [SET_COLLAPSED_SPRINTS]: (state, { payload }) => {
            
            let newState = [...state];

            return newState.map((t) => (t.id === payload.id ? payload : t));
        },
        [UPDATE_TASKS_GANTT]: (state, { payload }) => { // 간트차트에서 일감 기간 드래그 수정

            let newState = [...state];
            newState = newState.map((t) => (t.id === payload.id ? payload : t));

            // if(payload.project) {

            //     const [start, end] = getStartEndDateForProject(newState, payload.project);
            //     const project = newState[newState.findIndex((t) => t.id === payload.project)];

            //     if(project.start.getTime() !== start.getTime() ||
            //         project.end.getTime() !== end.getTime()) {

            //         const changedProject = { ...project, start, end };
            //         newState = newState.map((t) =>
            //             t.id === payload.project ? changedProject : t
            //         );
            //     }
		    // }

            return newState;
        },
        [SET_COLLAPSED_ALL_SPRINTS]: (state, { payload }) => { // 스프린트 리스트 상단 메뉴 누르면 전부 접기

            let newState = [...state];

            newState.map((el) => {
                if(el.type === 'project') {
                    el.hideChildren = true;
                    return el;
                } else {
                    return el;
                }
            })
            
            return newState;
        },
    },
    initialState
);

/* 리듀서에서 사용하는 메서드 */
//TODO:로직을 바꿔야함
const getStartEndDateForProject = (tasks, projectId) => { // 스프린트 기간이 일감기간에 따라 바뀜

    const projectTasks = tasks.filter((t) => t.project === projectId);
    let start = projectTasks[0].start;
    let end = projectTasks[0].end;

    for (let i = 0; i < projectTasks.length; i++) {

        const task = projectTasks[i];

        if (start.getTime() > task.start.getTime()) {
            start = task.start;
        }
        if (end.getTime() < task.end.getTime()) {
            end = task.end;
        }
    }

    return [start, end];
};

export default sprintsReducer;