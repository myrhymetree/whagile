import BacklogAndSprintCSS from '../backlog-and-sprint/BacklogAndSprint.module.css';

import BacklogComment from './BacklogComment';

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { Dropdown } from 'primereact/dropdown';
import { Sidebar} from 'primereact/sidebar';
import { InputTextarea } from 'primereact/inputtextarea';

function BacklogDetails({visibleRight, setVisibleRight}) {

    const backlogDetails = useSelector(state => state.backlogDetailReducer);
    const dispatch = useDispatch();

    const [description, setDescription] = useState('');
    const [editDescription, setEditDescription] = useState(false);
    const [editIssue, setEditIssue] = useState(false);


    const [selectedIssue, setSelectedIssue] = useState(null);

    const issueCheck = [
        { name: '기본', value: 0 },
        { name: '이슈', value: 1 }
    ];

    /* 백로그 수정 요청 */
    const modifyBacklog = () => {
        dispatch(callModifyBacklogAPI());
        alert('수정 성공');
        setEditDescription(false);
    };

    return (
        <Sidebar 
            id={ BacklogAndSprintCSS.backlogDetail }
            visible={ visibleRight } 
            position="right" 
            onHide={ () => setVisibleRight(false) }
        >
            <div>
                { backlogDetails.length === 0 ?
                    '상세 내용이 없습니다.' :
                    <>
                    <h3>{ backlogDetails[0].title }</h3>
                    <h6 id={ BacklogAndSprintCSS.fontColoring }>설명</h6>
                    <div onClick={ () => setEditDescription(true) }>
                        <span style={ { visibility: editDescription? 'hidden': 'visible' } }>
                            { 
                                backlogDetails[0].description != ''? 
                                backlogDetails[0].description : '백로그 설명이 없습니다.' 
                            }
                        </span><br/>
                        <InputTextarea 
                            style={ { visibility: editDescription? 'visible' : 'hidden' } }
                            id={ BacklogAndSprintCSS.inputComment }
                            value={ description } 
                            onChange={ (e) => setDescription(e.target.value) } 
                            rows={ 3 }
                        />
                        <button 
                            style={ { visibility: editDescription? 'visible' : 'hidden' } }
                            onClick={ () => modifyBacklog() }
                        >
                            적용
                        </button>            
                    </div>
                    <h6 id={ BacklogAndSprintCSS.fontColoring }>세부정보</h6>
                    <div id={ BacklogAndSprintCSS.detailDiv }>
                        <div onClick={ () => setEditIssue(!editIssue) }>
                            <label>구분</label>
                            {/* <label style={ { visibility: editIssue? 'hidden' : 'visible' } }>{ backlogDetails[0].issue === 1? '이슈' : '기본' }</label><br/> */}
                            {/* <Dropdown 
                                style={ { visibility: editIssue? 'visible': 'hidden' } } 
                                value={ selectedIssue } 
                                options={ issueCheck } 
                                optionLabel="name" 
                                optionValue="value" 
                                onChange={ (e) => setSelectedIssue(e.target.value) } 
                                placeholder="구분" 
                            /> */}
                        {/* <button 
                            style={ { visibility: editIssue? 'visible': 'hidden' } }
                            onClick={ () => setEditIssue(!editIssue) }>적용</button>             */}
                        </div>
                        <div>
                            <label>상위 스프린트</label>
                            <label>{ backlogDetails[0].sprintCode !== 0? backlogDetails[0].sprintName : '미지정' }</label>
                        </div>
                        <div><label>진행 상태</label><label>{ backlogDetails[0].progressStatus }</label></div>
                        <div><label>긴급도</label><label>{ backlogDetails[0].urgency }</label></div>
                        <div>
                            <label>담당자</label>
                            <label>{ backlogDetails[0].chargerCode !== 0? backlogDetails[0].chargerName : '담당자 없음'}</label>
                        </div>
                    </div>
                    <h6 id={ BacklogAndSprintCSS.fontColoring }>댓글</h6>
                    {/* <div>
                        <BacklogComment/>
                    </div> */}
                </>
            }
            </div>
        </Sidebar>
    );
}

export default BacklogDetails;