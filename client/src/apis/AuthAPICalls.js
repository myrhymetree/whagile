import { GET_AUTHS } from "../modules/AuthsModule";
import { GET_AUTH } from "../modules/AuthModule";

export function callGetAuthsAPI(params) {

    let requestURL = `http://localhost:8888/api/auth`;

    if(Object.keys(params).length !== 0) {
        requestURL += `?${Object.entries(params).map(param => param.join('=')).join('&')}`;
    }

    return async function getAuths(dispatch, getState) {
        
        const result = await fetch(requestURL).then(res => res.json());

        dispatch({ type: GET_AUTHS, payload: result.results });
    }
}

export function callGetAuthAPI(params) {

    let requestURL = `http://localhost:8888/api/auth/${params.authorityCode}`;

    return async function getAuths(dispatch, getState) {
        
        const result = await fetch(requestURL).then(res => res.json());
        
        dispatch({ type: GET_AUTH, payload: result.results[0] });
    }
}