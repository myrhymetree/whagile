import { FIND_BACKLOG_COMMENTS } from '../modules/BacklogCommentModule';
import { REGIST_BACKLOG_COMMENT } from '../modules/BacklogCommentDetailModule';

export function callGetBacklogCommentsAPI(params) {

    console.log('백로그 댓글 파라미터: ', params);

    let requestURL = 'http://localhost:8888/api/backlog-comments/';

    requestURL += `${params.backlogCode}?offset=${params.offset}&limit=${params.limit}`;

    console.log('**************backlog comment API URL****************');
    console.log(requestURL)

    return async function findBacklogComments(dispatch, getState) {

        const result = await fetch(requestURL)
                            .then(res => res.json());
        
        console.log('result: ', result.results)

        dispatch({ type: FIND_BACKLOG_COMMENTS,  payload: result.results });
    };
}

export function callPostBacklogCommentAPI(newComment) {

    const requestURL = 'http://localhost:8888/api/backlog-comments';

    return async function registBacklogComment(dispatch, getState) {

        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Token': window.localStorage.getItem('access_token')
            },
            body: JSON.stringify(newComment)
        }).then(res => res.json());

        await dispatch({ type: REGIST_BACKLOG_COMMENT, payload: result.message });
    }
}