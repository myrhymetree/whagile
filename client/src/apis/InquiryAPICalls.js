import { REGIST_INQUIRY } from "../modules/InquiryModule";

/* 1:1 문의 등록 API 호출 */
export function callPostInquiryAPI(newInquiry) {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8888/api/inquiries`;

    return async function registInquiry(dispatch, getState) {

        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Token': window.localStorage.getItem('access_token')
            },
            body: JSON.stringify(newInquiry)
        }).then(res => res.json());

        await dispatch({ type: REGIST_INQUIRY, payload: result });
    }
}