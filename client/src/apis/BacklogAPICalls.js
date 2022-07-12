import { GET_BACKLOGS } from '../modules/BacklogModule';

export function allGetBacklogsAPI(url) {

    const requestURL = url || 'http://localhost:8888/api/backlogs';

    return async function getBacklogs(dispatch, getState) {
        const result = await fetch(requestURL).then(res => res.json());

        dispatch({ type: GET_BACKLOGS,  payload: result.results });
    };
}