import { GET_AUTHS } from "../modules/AuthsModule";
import { GET_PROJECTS } from "../modules/ProjectModules";

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