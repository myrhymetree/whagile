import { GET_PROJECT, GET_PROJECTS } from "../modules/ProjectModules";

export function callGetProjectsAPI(params) {
    
    let requestURL = `http://localhost:8888/api/projects`;

    if(Object.keys(params).length !== 0) {
        requestURL += `?${Object.entries(params).map(param => param.join('=')).join('&')}`;
    }

    return async function getProjects(dispatch, getState) {
        
        const result = await fetch(requestURL).then(res => res.json());

        dispatch({ type: GET_PROJECTS, payload: result.results });
    }
}

export function callGetProjectAPI(params) {

    let requestURL = `http://localhost:8888/api/projects/`;

    requestURL += `${Object.entries(params).map(param => param.slice(1))}`;

    return async function getProject(dispatch, getState) {

        const result = await fetch(requestURL).then(res => res.json());

        dispatch({ type: GET_PROJECT, payload: result.results});
    }
}