import { GET_AUTHS } from "../modules/AuthsModule";
import { GET_AUTH } from "../modules/AuthModule";
import { GET_AUTH_ORDER } from "../modules/AuthOrderModule";

export const callGetAuthsAPI = (params) => {

    let requestURL = `http://localhost:8888/api/auth`;
    
    if(Object.keys(params).length !== 0) {
        requestURL += `?${Object.entries(params).map(param => param.join('=')).join('&')}`;
    }
    
    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL).then(res => res.json());

        dispatch({ type: GET_AUTHS, payload: result.results });
    }
}

export const callGetAuthAPI = (params) => {

    let requestURL = `http://localhost:8888/api/auth/${params.authorityCode}`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL).then(res => res.json());
        
        dispatch({ type: GET_AUTH, payload: result.results[0] });
    }
}

export const callGetAuthOrderAPI = (params) => {

    let requestURL = `http://localhost:8888/api/auth`;

    if(Object.keys(params).length !== 0) {
        requestURL += `?${Object.entries(params).map(param => param.join('=')).join('&')}`;
    }

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL).then(res => res.json());

        dispatch({ type: GET_AUTH_ORDER, payload: result.results });
    }
}

export const callPostAuthAPI = (paramAuth, paramAuthOrder) => {

    let requestURL = `http://localhost:8888/api/auth`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                authorityName: paramAuth.authorityName,
                authorityActivatedYn: paramAuth.authorityActivatedYn,
                authorityExposureOrder: (paramAuth.authorityExposureOrder)? paramAuth.authorityExposureOrder: '',
                authorityDescription: paramAuth.authorityDescription
            })
        })
        .then(() => dispatch(callPutAuthOrderAPI(paramAuthOrder)))
        .then(() => dispatch(callGetAuthsAPI({ 
            'offset': 0,
            'limit': 30,
            'orderCondition': 'code',
            'orderValue': 'desc'
        })));
    }

}

export const callPutAuthOrderAPI = (params) => {
    
    let requestURL = `http://localhost:8888/api/auth/order`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
        .then(() => dispatch(callGetAuthOrderAPI({ 
            'searchCondition': 'activated_yn',
            'searchValue': 'Y',
            'orderCondition': 'exposure_order',
            'orderValue': 'asc'
        })));
    }

}

export const callPutAuthAPI = (paramAuth, paramAuthOrder) => {

    let requestURL = `http://localhost:8888/api/auth`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                authorityCode: paramAuth.authorityCode,
                authorityName: paramAuth.authorityName,
                authorityActivatedYn: paramAuth.authorityActivatedYn,
                authorityExposureOrder: (paramAuth.authorityExposureOrder)? paramAuth.authorityExposureOrder: '',
                authorityDescription: paramAuth.authorityDescription
            })
        })
        .then(() => dispatch(callPutAuthOrderAPI(paramAuthOrder)))
        .then(() => dispatch(callGetAuthsAPI({ 
            'offset': 0,
            'limit': 30,
            'orderCondition': 'code',
            'orderValue': 'desc'
        })))
        .then(() => dispatch(callGetAuthOrderAPI({ 
            'searchCondition': 'activated_yn',
            'searchValue': 'Y',
            'orderCondition': 'exposure_order',
            'orderValue': 'asc'
        })));
    }
}

export const callDeleteAuthAPI = (params) => {

    let requestURL = `http://localhost:8888/api/auth`;

    // return async (dispatch, getState) => {
        
    //     const result = await fetch(requestURL).then(res => res.json());
        
    //     dispatch({ type: GET_AUTH, payload: result.results[0] });
    // }
}