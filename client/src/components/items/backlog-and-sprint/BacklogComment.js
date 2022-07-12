import BacklogCommentCSS from "./BacklogComment.module.css";
import BacklogAndSprintCSS from "./BacklogAndSprint.module.css";
import { decodeJwt } from '../../../utils/tokenUtils';

import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { callGetBacklogCommentsAPI, callPostBacklogCommentAPI } from '../../../apis/BacklogCommentAPICalls';

import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { callGetBacklogDetailsAPI } from "../../../apis/BacklogAPICalls";

function BacklogComment({backlogCode, projectCode}) {

    const dispatch = useDispatch();
    const backlogComments = useSelector(state => state.backlogCommentReducer);
    const backlogCommentDetail = useSelector(state => state.backlogCommentDetailReducer);
    const loginUser = decodeJwt(window.localStorage.getItem('access_token'));

    const [pageNo, setPageNo] = useState(0);
    const [editable, setEditable] = useState(false);
    const [modifiedComment, setModifiedComment] = useState(null);
    const [content, setContent] = useState(null);

    const newComment = {
        content: content,
        backlogCode: backlogCode,
        projectCode: projectCode,
    };

    useEffect(
        () => {
            if(backlogCommentDetail.length > 0 && typeof(backlogCommentDetail) == 'string') {
                alert(backlogCommentDetail);
            }
            dispatch(callGetBacklogDetailsAPI(backlogCode));
        },
        [backlogComments, backlogCommentDetail]
    );

    /* 댓글 갯수에 따른 style 주솟값 캐슁 */
    const noComments = useMemo(
        () => {
            return {
                show: {display: backlogComments.length > 0? 'none' : 'block'},
                hide: {display: backlogComments.length > 0? 'block' : 'none'}
            }
        },
        [backlogComments]
    );

    /* 댓글 편집 가능 여부에 따른 style 주솟값 캐슁 */
    const toggle = useMemo(
        () => {
            return {
                on: {display: editable? 'block' : 'none'},
                off: {display: !editable? 'block' : 'none'}
            }
        },
        [editable]
    );

    /* 백로그 댓글 등록 */
    const registNewComment = () => {

        return new Promise(async (resolve, reject) => {
            await dispatch(callPostBacklogCommentAPI(newComment));
            await console.log('확인해야해', backlogCommentDetail);
            // dispatch(callGetBacklogCommentsAPI({
            //     backlogCode: backlogCode,
            //     offset: 0,
            //     limit: 5
            // }));
            await window.location.replace(window.location.href);
        });
    };

    const removeComment = () => {
        alert('댓글 삭제 confirm 창 표시')
    };
    
    return (
        <>
            <div 
                id={ BacklogCommentCSS.noComments }
                style={ noComments.show }
            >
                댓글이 없습니다.
            </div> 
            {backlogComments.map(comment => 
                <div key={ comment.backlogCommentCode }>
                    <label id={ BacklogCommentCSS.memberName }>{ comment.memberName }</label>
                    <label id={ BacklogCommentCSS.latestEdited }>
                        { comment.modifiedYN === 'Y'? comment.modifiedDate : comment.createdDate }
                    </label>
                    <label id={ BacklogCommentCSS.modifiedYN }>
                        { comment.modifiedYN == 'Y'? '수정됨' : '' }
                    </label>
                    <div 
                        className={ BacklogCommentCSS.editArea }
                        style={ toggle.on }
                    >
                        <InputTextarea 
                            id={ BacklogCommentCSS.modifyCommentTextarea }
                            value={ modifiedComment } 
                            onChange={ (e) => setModifiedComment(e.target.value) }
                            placeholder={ comment.content }
                        />
                        <Button 
                            id={ BacklogCommentCSS.modifyCancelBtn } 
                            label="취소"
                            onClick={ () => setEditable(false) }
                        />
                        <Button 
                            id={ BacklogCommentCSS.modifySaveBtn } 
                            label="저장"
                            onClick={ () => alert(`댓글 수정 api 요청`) }    
                        />
                    </div>
                    <div>
                        <div
                            id={ BacklogCommentCSS.content }
                            style={ toggle.off }
                        >
                            <p>{ comment.content }</p>
                        </div>
                        <div
                            id={ BacklogCommentCSS.editableBtns }
                            style={ {visibility: comment.memberCode == loginUser.code && !editable? 'visible' : 'hidden'} }
                        >
                            <button 
                                id={ BacklogCommentCSS.editComment }
                                name="editComment"
                                onClick={ () => setEditable(true) }
                            >
                                수정
                            </button>|    
                            <button 
                                id={ BacklogCommentCSS.removeComment }
                                onClick={ () => removeComment() }
                            >
                                삭제
                            </button>    
                        </div>
                    </div>
                </div>
            )}
            <button style={ noComments.hide }>댓글 더보기</button>
            <div id={ BacklogAndSprintCSS.newComment }>
                <h6 className={ BacklogAndSprintCSS.fontColoring }>댓글 작성</h6>
                <InputTextarea 
                    id={ BacklogAndSprintCSS.inputComment }
                    value={ content } 
                    onChange={ (e) => setContent(e.target.value) } 
                    rows={ 3 }
                /><br/>
                <Button 
                    id={ BacklogAndSprintCSS.registCommentBtn } 
                    label="등록"
                    onClick={ registNewComment }
                    disabled={ content === null || content === ''? true : false}
                />
            </div>
        </>
    );
};
export default BacklogComment;