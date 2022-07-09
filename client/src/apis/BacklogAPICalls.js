import { FIND_BACKLOGS } from '../modules/BacklogModule';
import { FIND_BACKLOG_DETAILS } from '../modules/BacklogDetailModule';

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
