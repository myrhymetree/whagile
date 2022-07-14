import { GET_SPRINTS } from '../modules/SprintsModule';
import { GET_SPRINT } from '../modules/SprintModule';
import { GET_BACKLOGS } from '../modules/SprintBacklogsModule';
import { GET_COUNT } from '../modules/SprintsCountModule';
import { GET_SPRINT_TASK } from '../modules/SprintTaskModule';

export function callGetSprintsAPI(params) {
    
    let requestURL = `http://localhost:8888/api/sprints`;
    
    let defaultParams = { 
        // 'offset': 0,
        // 'limit': 30,
        orderCondition: 'code',
        orderValue: 'desc',
    };

    if(params === undefined || Object.keys(params).length === 0) {
        requestURL += `?${Object.entries(defaultParams).map(param => param.join('=')).join('&')}`;
    } else {
        requestURL += `?${Object.entries(params).map(param => param.join('=')).join('&')}`;
    }
    
    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL).then(res => res.json());
        
        dispatch({ type: GET_SPRINTS, payload: result.results });

        await dispatch(callGetSprintsCountAPI({ // 스프린트, 일감, 백로그 갯수 조회
            projectCode: params.projectCode,
            searchCondition: params.searchCondition,
            searchValue: params.searchValue
        }));
    }
}

export function callGetSprintAPI(params) {

    let requestURL = `http://localhost:8888/api/sprints/${params.sprintCode}`;
    
    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL).then(res => res.json());
        
        dispatch({ type: GET_SPRINT, payload: result.results });
    }
}

export function callPostSprintAPI(params, changedTasks, currentInfo) {

    let requestURL = `http://localhost:8888/api/sprints`;
    
    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sprintName: params.sprintName,
                sprintTarget: params.sprintTarget,
                sprintStartDate: (params.sprintStartDate)? dateFormat(new Date(params.sprintStartDate), 'start'): '',
                sprintEndDate: (params.sprintEndDate)? dateFormat(new Date(params.sprintEndDate), 'end'): '',
                sprintProgressStatus: 'N',
                changedTasks: changedTasks,
                currentInfo: currentInfo,
            })
        }).then(res => res.json());
        
        await dispatch(callGetSprintsAPI({	// 스프린트 목록 조회
            projectCode: parseInt(currentInfo.projectCode),
            isGantt: true	// true일 경우, 진행 중 sprint가 맨위에 오고 진행 중이 아닌 sprint들은 sprintCode로 내림차순 정렬된다
        }));

        await dispatch(callGetBacklogsAPI({	// 스프린트 내 백로그 목록 조회
            offset: 0,
            limit: 1000,
            projectCode: currentInfo.projectCode
        }));

        await dispatch(callGetSprintsCountAPI({ // 스프린트, 일감, 백로그 갯수 조회
            projectCode: currentInfo.projectCode
        }));
    }
}

export function callPutSprintAPI(params, changedTasks, currentInfo) {

    let requestURL = `http://localhost:8888/api/sprints`;
    
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sprintCode: params.sprintCode,
                sprintName: params.sprintName,
                sprintTarget: params.sprintTarget,
                sprintStartDate: (params.sprintStartDate)? dateFormat(new Date(params.sprintStartDate), 'start'): '',
                sprintEndDate: (params.sprintEndDate)? dateFormat(new Date(params.sprintEndDate), 'end'): '',
                sprintProgressStatus: params.sprintProgressStatus,
                changedTasks: changedTasks,
                currentInfo: currentInfo,
            })
        }).then(res => res.json());

        await dispatch(callGetSprintsAPI({	// 스프린트 목록 조회
            projectCode: parseInt(currentInfo.projectCode),
            isGantt: true	// true일 경우, 진행 중 sprint가 맨위에 오고 진행 중이 아닌 sprint들은 sprintCode로 내림차순 정렬된다
        }));

        await dispatch(callGetBacklogsAPI({	// 스프린트 내 백로그 목록 조회
            offset: 0,
            limit: 1000,
            projectCode: currentInfo.projectCode
        }));

        await dispatch(callGetSprintsCountAPI({ // 스프린트, 일감, 백로그 갯수 조회
            projectCode: currentInfo.projectCode
        }));
    }
}

export function callDeleteSprintAPI(sprintCode, projectCode) {
    
    let requestURL = `http://localhost:8888/api/sprints`;
    
    return async (dispatch, getState) => {
        
        await fetch(requestURL, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sprintCode: sprintCode
            })
        })
        
        await dispatch(callGetSprintsAPI({	// 스프린트 목록 조회
            projectCode: parseInt(projectCode),
            isGantt: true	// true일 경우, 진행 중 sprint가 맨위에 오고 진행 중이 아닌 sprint들은 sprintCode로 내림차순 정렬된다
        }));

        await dispatch(callGetBacklogsAPI({	// 스프린트 내 백로그 목록 조회
            offset: 0,
            limit: 1000,
            projectCode: projectCode
        }));

        await dispatch(callGetSprintsCountAPI({ // 스프린트, 일감, 백로그 갯수 조회
            projectCode: projectCode
        }));
    }
}

export function callGetBacklogsAPI(params) {

    let requestURL = `http://localhost:8888/api/backlogs`;

    if(!(params === undefined || Object.keys(params).length === 0)) {
        requestURL += `?${Object.entries(params).map(param => param.join('=')).join('&')}`;
    }
    
    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL).then(res => res.json());
        
        dispatch({ type: GET_BACKLOGS, payload: result.results });
    }
}

export function callGetSprintsCountAPI(params) {
    
    let requestURL = `http://localhost:8888/api/sprints/count`;

    if(!(params === undefined || Object.keys(params).length === 0)) {
        requestURL += `?${Object.entries(params).map(param => param.join('=')).join('&')}`;
    }
    
    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL).then(res => res.json());
        
        dispatch({ type: GET_COUNT, payload: result.results });
    }
}

export function callGetTaskAPI(params) {
    
    let requestURL = `http://localhost:8888/api/tasks/${params.taskCode}`;
    
    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL).then(res => res.json());
        
        dispatch({ type: GET_SPRINT_TASK, payload: result.results[0] });
    }
}

export function callUpdateTaskAPI(params, projectCode) {
    
    let requestURL = `http://localhost:8888/api/tasks`;
    
    return async (dispatch, getState) => {
        //TODO: 일감 수정 api가 없어요
        // const result = await fetch(requestURL, {
        //     method: 'PUT',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         backlogTitle: params.backlogTitle,
        //         backlogDescription: params.backlogDescription,
        //         backlogStartDate: (params.backlogStartDate)? dateFormat(new Date(params.backlogStartDate), 'start'): '',
        //         backlogEndDate: (params.backlogEndDate)? dateFormat(new Date(params.backlogEndDate), 'end'): '',
        //         backlogUrgency: params.backlogUrgency,
        //         backlogIssue: params.backlogIssue,
        //         backlogChargerCode: params.backlogChargerCode,
        //     })
        // }).then(res => res.json());
        
        await dispatch(callGetSprintsAPI({	// 스프린트 목록 조회
            projectCode: projectCode,
            isGantt: true	// true일 경우, 진행 중 sprint가 맨위에 오고 진행 중이 아닌 sprint들은 sprintCode로 내림차순 정렬된다
        }));

        await dispatch(callGetBacklogsAPI({	// 스프린트 내 백로그 목록 조회
            offset: 0,
            limit: 1000,
            projectCode: projectCode
        }));

        await dispatch(callGetSprintsCountAPI({ // 스프린트, 일감, 백로그 갯수 조회
            projectCode: projectCode
        }));
    }
}

function dateFormat(date, when) { // Fri Jul 01 2022 00:00:00 GMT+0900 (한국 표준시) 형식을 '2022-07-01 00:00:00'으로 바꿔줌
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;

    if(when === 'start') {
        return date.getFullYear() + '-' + month + '-' + day  + 'T00:00:00.000Z';
    }

    if(when === 'end') {
        return date.getFullYear() + '-' + month + '-' + day  + 'T23:59:59.000Z';
    }
}