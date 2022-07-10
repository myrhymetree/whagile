import { GET_SPRINTS } from '../modules/SprintsModule';
import { GET_SPRINT } from '../modules/SprintModule';

export function callGetSpintsAPI(params) {
    
    let requestURL = `http://localhost:8888/api/sprints`;
    
    let defaultParams = { 
        // 'offset': 0,
        // 'limit': 30,
        'orderCondition': 'code',
        'orderValue': 'desc'
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

export function callGetSpintAPI(params) {

    let requestURL = `http://localhost:8888/api/sprints/${params.sprintCode}`;
    
    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL).then(res => res.json());
        
        dispatch({ type: GET_SPRINT, payload: result.results });
    }
}

export function callPostSpintAPI(params) {}

export function callPutSpintAPI(params) {}

export function callDeleteSpintAPI(params) {}
