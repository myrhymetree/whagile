import BacklogCommentCSS from './BacklogComment.module.css';
import BacklogAndSprintCSS from './BacklogAndSprint.module.css';
import { decodeJwt } from '../../../utils/tokenUtils';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { callGetBacklogCommentsAPI, callPostBacklogCommentAPI, callDeleteBacklogCommentAPI } from '../../../apis/BacklogCommentAPICalls';

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

function BacklogComment({backlogCode, projectCode}) {

    const loginUser = decodeJwt(window.localStorage.getItem('access_token'));

    /* redux modules */
    const dispatch = useDispatch();
    const backlogComments = useSelector(state => state.backlogCommentReducer);
    const backlogCommentDetail = useSelector(state => state.backlogCommentDetailReducer);
  
    const toast = useRef(null);
  
    /* confirm 창 표시 상태 */
    const [removalVisible, setRemovalVisible] = useState(false);

    /* 페이징 */
    const [pageNo, setPageNo] = useState(0);
    const [limit, setLimit] = useState(5);

    /* 새 댓글 생성, 댓글 수정, 댓글 삭제 임시데이터 상태 */
    const [content, setContent] = useState(null);
    const [editable, setEditable] = useState(false);
    const [modifiedComment, setModifiedComment] = useState(null);
    const [removeRequest, setRemoveRequest] = useState({});
        
    useEffect(
        () => {
            if (backlogCommentDetail.status === 200 || backlogCommentDetail.status === 201) {
                toast.current.show({ 
                    severity: 'info', 
                    summary: 'Confirmed', 
                    detail: backlogCommentDetail.message, 
                    life: 3000 
                });
            }
        },
        [backlogCommentDetail]
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
    
    /* 백로그 댓글 더보기 */
    const readMoreComments = useCallback(
        () => {
            dispatch(callGetBacklogCommentsAPI(
                {
                    backlogCode: backlogCode,
                    offset: (pageNo + 1) * limit,
                    limit: limit
                }
            ));
            setPageNo(pageNo + 1);
        },
        [backlogComments]
    );
    
    /* 백로그 댓글 등록 */
    const registNewComment = () => {
        /* 새 댓글 등록용 파라미터 선언 및 초기화 */        
        const newComment = {
            content: content,
            backlogCode: backlogCode,
            projectCode: projectCode,
        };

        console.log(newComment)

        return new Promise(async (resolve, reject) => {
            await dispatch(callPostBacklogCommentAPI(newComment));
            await window.location.replace(window.location.href);
        });
    };

    /* 백로그 댓글 삭제 */
    const removeComment = (backlogCommentCode, memberCode) => {
        setRemoveRequest({
            'backlogCommentCode': backlogCommentCode,
            'projectCode': projectCode
        });
        
        setRemovalVisible(true);
    };

    const accept = (backlogCommentCode, memberCode) => {
        return new Promise(async (resolve, reject) => {
            await dispatch(callDeleteBacklogCommentAPI(removeRequest));
            await setRemovalVisible(false);
            await window.location.replace(window.location.href);
        });
    }

    const reject = () => {}
    
    return (
        <>
            <Toast ref={ toast }/>
            <ConfirmDialog 
                id={ BacklogCommentCSS.deleteConfirm }
                visible={ removalVisible } 
                onHide={ () => setRemovalVisible(false) } 
                message="삭제 시 복구할 수 없습니다."
                header="댓글을 삭제하시겠습니까?" 
                icon="pi pi-exclamation-triangle" 
                acceptClassName={ BacklogCommentCSS.deleteAcceptBtn }
                rejectClassName={ BacklogCommentCSS.deleteRejectBtn }
                acceptLabel="예"
                rejectLabel="아니오"
                accept={ () => accept() }
                reject={ () => reject() } 
            />            
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
                                onClick={ () => removeComment(comment.backlogCommentCode, comment.memberCode) }
                            >
                                삭제
                            </button>   
                        </div>
                    </div>
                </div>
            )}
            <div
                style={ noComments.hide }
            >
                <button 
                    id={ BacklogCommentCSS.moreCommentsBtn }
                    onClick={ readMoreComments }
            >
                    <i className="pi pi-fw pi-ellipsis-h" style={{ fontSize: '10px' }}/> 더보기
                </button>
            </div>
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