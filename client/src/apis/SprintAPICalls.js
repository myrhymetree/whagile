import { GET_SPRINTS } from '../modules/SprintsModule';
import { GET_SPRINT } from '../modules/SprintModule';
import { GET_BACKLOGS } from '../modules/SprintBacklogModule';

export function callGetSprintsAPI(params) {
    
    let requestURL = `http://localhost:8888/api/sprints`;
    
    let defaultParams = { 
        // 'offset': 0,
        // 'limit': 30,
        'orderCondition': 'code',
        'orderValue': 'desc',
    };

    if(params === undefined || Object.keys(params).length === 0) {
        requestURL += `?${Object.entries(defaultParams).map(param => param.join('=')).join('&')}`;
    } else {
        requestURL += `?${Object.entries(params).map(param => param.join('=')).join('&')}`;
    }
    
    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL).then(res => res.json());
        
        dispatch({ type: GET_SPRINTS, payload: result.results });
    }
}

export function callGetSprintAPI(params) {

    let requestURL = `http://localhost:8888/api/sprints/${params.sprintCode}`;
    
    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL).then(res => res.json());
        
        dispatch({ type: GET_SPRINT, payload: result.results });
    }
}

export function callPostSprintAPI(params) {}

export function callPutSprintAPI(params) {}

export function callDeleteSprintAPI(params) {}

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