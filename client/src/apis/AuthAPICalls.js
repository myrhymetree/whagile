import { GET_AUTHS } from "../modules/AuthModule";

export function callGetAuthsAPI(params) {

    let requestURL = `http://localhost:8888/api/auth?offset=${params.offset}&limit=${params.limit}`;

    if(params.searchValue) {
        requestURL += `&searchValue=${params.searchValue}`
        if(params.searchCondition) {
            requestURL += `&searchCondition=${params.searchCondition}`
        }
    }

    return async function getAuths(dispatch, getState) {
        
        const result = await fetch(requestURL).then(res => res.json());

        console.log('result : ', result.results);
        dispatch({ type: GET_AUTHS, payload: result.results });
    }
}