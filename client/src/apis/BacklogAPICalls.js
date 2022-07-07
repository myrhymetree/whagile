import { FIND_BACKLOGS, FIND_BACKLOG_DETAIL } from '../modules/BacklogModule';

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

    return async function getBacklogs(dispatch, getState) {

        const preState = getState().backlogReducer;
        console.log('preState: ', preState)
        const result = await fetch(requestURL)
                            .then(res => res.json());
        const payload = await preState.concat(result.results);

        dispatch({ type: FIND_BACKLOGS,  payload: payload });
    };
}