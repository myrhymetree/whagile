import BacklogCommentCSS from "./BacklogComment.module.css";
import { decodeJwt } from '../../../utils/tokenUtils';

import { useState } from 'react';

import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

function BacklogComment() {

    //fake data
    const commentData = {
        memberCode: 3,
        memberName: "홍길동",
        latestEdited: "2022. 2. 22. 오전 00:00:00",
        content: "댓글입니다.",
        modifiedYN: "Y"
    };
    const { memberCode, memberName, latestEdited, content, modifiedYN } = commentData;

    const loginUser = decodeJwt(window.localStorage.getItem('access_token'));
    console.log(loginUser);

    const removeComment = () => {
        alert('댓글 삭제 confirm 창 표시')
    };

    const [editable, setEditable] = useState(false);

    return (
        <div>
            <label id={ BacklogCommentCSS.memberName }>{ memberName }</label>
            <label id={ BacklogCommentCSS.latestEdited }>{ latestEdited }</label>
            <label id={ BacklogCommentCSS.modifiedYN }>{ modifiedYN == 'Y'? '수정됨' : '' }</label>
            <br/>
            <div 
                style={ {display: editable? 'block' : 'none'}  }
            >
                <InputTextarea 
                    id={ BacklogCommentCSS.modifyCommentTextarea }
                    value={ content } 
                />
                <Button 
                    id={ BacklogCommentCSS.modifyCancelBtn } 
                    label="취소"
                    onClick={ () => setEditable(false) }
                />
                <Button 
                    id={ BacklogCommentCSS.modifySaveBtn } 
                    label="저장"
                    onClick={ () => alert(`댓글 수정 api 요청\n${ content }`) }    
                />
                <br/><br/>
                <br/><br/>
            </div>
            <div
                style={ {display: editable? 'none' : 'block'}  }
            >
                <p id={ BacklogCommentCSS.content }>{ content }</p>
            </div>
            <div
                style={ {display: memberCode == loginUser.code && !editable? 'block' : 'none'} }
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
                <br/><br/><br/><br/>
            </div>
        </div>
    );
};
export default BacklogComment;