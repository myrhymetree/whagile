import { FIND_SPRINTS, CLEAN_SPRINTS } from '../modules/SprintsForBacklogModule';

/* 스프린트 목록 조회 API 호출 */
export function callGetSprintsAPI(params) {

    alert('일단 요기까지')
    let requestURL = `http://${ process.env.REACT_APP_RESTAPI_IP }:8888/api/sprints`;

    if(Object.keys(params).length !== 0) {

        console.log(params)
        const paramKeys = [];
        const paramValues = [];

        Object.keys(params).forEach(param => paramKeys.push(param));
        Object.values(params).forEach(param => paramValues.push(param));

        requestURL = requestURL + '?';

        for(let i = 0; i < Object.keys(params).length; i++) {
            requestURL += `${ paramKeys[i] }=${ paramValues[i] }&`;
        }
        
        console.log('스프린트 목록 조회 요청 API: ', requestURL);
        requestURL = requestURL.slice(0, requestURL.length - 1);
        console.log('스프린트 목록 조회 요청 API: ', requestURL);
    }

    return async function findSprints(dispatch, getState) {
        // const preState = await getState().sprintsForBacklogReducer;

        const result = await fetch(requestURL).then(res => res.json());

        await dispatch({ type: FIND_SPRINTS, payload: result.results });
        console.log('스프린트', result);
        // await dispatch({ type: FIND_SPRINTS, payload: preState.concat(result.results) });
    }
}

/* 기존 스프린트 목록 초기화 */
export function callCleanSprints() {

    return async function cleanSprints(dispatch, getState) {

        dispatch({ type: CLEAN_SPRINTS, payload: [] });
    }
}