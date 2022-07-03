import { GET_PROJECT, GET_PROJECTS, POST_PROJECT } from "../modules/ProjectModules";
import { decodeJwt } from '../utils/tokenUtils';

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

export const  callPostProjectAPI = (projectName, projectDescription) => {

    let requestURL = 'https://localhost:8888/api/projects';
    const decoded = decodeJwt(window.localStorage.getItem("access_token"));

    console.log('decoded', decoded.code);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projectName: projectName,
                projectDescription: projectDescription,
                loginMember: decoded.code
            })
        })
        .then(() => dispatch({ type: POST_PROJECT, payload: result.results }))
    }
}