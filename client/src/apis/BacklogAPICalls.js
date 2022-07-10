import { FIND_BACKLOGS } from '../modules/BacklogModule';
import { FIND_BACKLOG_DETAILS, MODIFY_BACKLOG, DELETE_BACKLOG } from '../modules/BacklogDetailModule';

export function callGetBacklogsAPI(params) {

    let requestURL = 'http://localhost:8888/api/backlogs';

    if(Object.keys(params).length !== 0) {

        const paramKeys = [];
        const paramValues = [];

        Object.keys(params).forEach(param => paramKeys.push(param));
        Object.values(params).forEach(param => paramValues.push(param));

        console.log(`param keys and values\n${paramKeys}\n${paramValues}`)

        requestURL = requestURL += '?';

        for(let i = 0; i < Object.keys(params).length; i++) {
            requestURL += `${paramKeys[i]}=${paramValues[i]}&`;
        }

        requestURL = requestURL.slice(0, requestURL.length - 1);

        console.log(`requestURL 어떻게 생겼니? ${ requestURL }`)
    }

    return async function findBacklogs(dispatch, getState) {

        const result = await fetch(requestURL)
                            .then(res => res.json());

        dispatch({ type: FIND_BACKLOGS,  payload: result.results });
    };
}

export function callGetBacklogDetailsAPI(backlogCode) {

    let requestURL = 'http://localhost:8888/api/backlogs/' + backlogCode;
    console.log('requestURL: ' + requestURL);

    return async function findBacklogDetails(dispatch, getState) {

        const result = await fetch(requestURL).then(res => res.json());

        dispatch({ type: FIND_BACKLOG_DETAILS, payload: result.results});
    }
}

export function callPutBacklogAPI(modifiedBacklog) {

    const requestURL = 'http://localhost:8888/api/backlogs';

    return async function modifyBacklog(dispatch, getState) {
        
        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Token': window.localStorage.getItem('access_token')
            },
            body: JSON.stringify(modifiedBacklog)
        }).then(res => res.json());

        await dispatch({ type: MODIFY_BACKLOG, payload: result.results });
    }
}

export function callDeleteBacklogAPI(backlogCode, projectCode) {

    const requestURL = 'http://localhost:8888/api/backlogs';

    return async function removeBacklog(dispatch, getState) {
        
        const result = await fetch(requestURL, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Token': window.localStorage.getItem('access_token')
            },
            body: JSON.stringify({
                backlogCode, 
                projectCode
            })
        }).then(res => res.json());

        await dispatch({ type: DELETE_BACKLOG, payload: result.results });
    }

}