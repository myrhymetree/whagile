import BacklogAndSprintCSS from './BacklogAndSprint.module.css';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FIND_BACKLOG } from '../../../modules/BacklogModule';

import DivHeader from './DivHeader';
import BacklogCreationModal from './BacklogCreationModal';
import BacklogComment from './BacklogComment';

import { Sidebar} from 'primereact/sidebar';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { callGetBacklogsAPI } from '../../../apis/BacklogAPICalls';

function Backlogs() {
    
    const dispatch = useDispatch();
    const backlogs = useSelector(state => state.backlogReducer);    //api에서 가져온 백로그 목록
    
    const [visibleRight, setVisibleRight] = useState(false);
    const [content, setContent] = useState('');
    /* 페이징 */
    const [pageNo, setPageNo] = useState(0);
    const [backlogList, setBacklogList] = useState([]);
    /* 필터 조건 */
    const [selectedProgressStatus, setSelectedProgressStatus] = useState(null);
    const [selectedUrgency, setSelectedUrgency] = useState(null);
    const [selectedIssue, setSelectedIssue] = useState(null);

    /* 필터 조건 options */
    const progressStatusOptions = [
        { name: '진행 전', value: '진행 전' },
        { name: '진행 중', value: '진행 중' },
        { name: '완료', value: '완료' }
    ];
    const urgencyOptions = [
        { name: '낮음', value: '낮음' },
        { name: '보통', value: '보통' },
        { name: '긴급', value: '긴급' }
    ];
    const issueCheck = [
        { name: '기본', value: 0 },
        { name: '이슈', value: 1 }
    ];

    useEffect(
        () => {
            if(selectedProgressStatus === null ) {

                dispatch(callGetBacklogsAPI({
                    'offset': pageNo,
                    'limit': 10
                }));
            }

            console.log('backlog##########################', backlogs)
        },
        [selectedUrgency, selectedProgressStatus, selectedIssue]
    );

    /* 목록 행 더보기 요청 onClick Handler fuction */
    const readMoreBacklogs = () => {
        dispatch(callGetBacklogsAPI(
            {
                'offset': (pageNo + 1) * 10, 
                'limit': 10
            }
        ));
        console.log('more backlogs@@@@@@@@@@@@', backlogs)

        setPageNo(pageNo + 1);
    };

    /* 필터 조건을 적용한 목록행 조회 요청 */
    const findFilteredResults = () => {
        dispatch(callGetBacklogsAPI(
            {
                offset: pageNo,
                limit: 10,
                progressStatus: selectedProgressStatus,
                urgency: selectedUrgency,
                issue: selectedIssue
            }
        ));
    };

    return (
        <>
            <span className={ BacklogAndSprintCSS.divTitle }>백로그 목록</span>
            <hr className={ BacklogAndSprintCSS.divisionLine }/>
            <div id={ BacklogAndSprintCSS.filterConditions }>
                <Dropdown 
                    value={ selectedProgressStatus } 
                    options={ progressStatusOptions } 
                    optionLabel="name" 
                    optionValue="value" 
                    onChange={ (e) => setSelectedProgressStatus(e.target.value) }  
                    placeholder="진행상태" 
                />  
                <Dropdown 
                    value={ selectedUrgency } 
                    options={ urgencyOptions } 
                    onChange={ (e) => setSelectedUrgency(e.target.value) }  
                    optionLabel="name" 
                    optionValue="value" 
                    placeholder="긴급도" 
                />
                <Dropdown 
                    value={ selectedIssue } 
                    options={ issueCheck } 
                    optionLabel="name" 
                    optionValue="value" 
                    onChange={ (e) => setSelectedIssue(e.target.value) } 
                    placeholder="구분" 
                />
                <button onClick={ () => findFilteredResults() }>적용</button>            
            </div>
            <div>
                <DivHeader/>
                { backlogs.map(backlog => 
                        <div className={ BacklogAndSprintCSS.backlogItem }>
                            <label>{ backlog.backlogCode }</label>
                            <label>{ backlog.issue === 1? '이슈' : '기본' }</label>
                            <label>{ backlog.backlogTitle }</label>
                            <label>{ backlog.progressStatus }</label>
                            <label>{ backlog.urgency }</label>
                            <label>{ backlog.memberName }</label>
                            <button 
                                id={ BacklogAndSprintCSS.moreDetailsBtn }
                                onClick={ () => setVisibleRight(true) }
                            >
                                자세히
                            </button>
                    </div>
                )}
                <div>
                    <Sidebar 
                        id={ BacklogAndSprintCSS.backlogDetail }
                        visible={visibleRight} 
                        position="right" 
                        onHide={ () => setVisibleRight(false) }
                    >
                        <div>
                        <h3>백로그 제목</h3>
                            <h6 id={ BacklogAndSprintCSS.fontColoring }>설명</h6>
                            <p>설명입니다.</p>

                            <h6 id={ BacklogAndSprintCSS.fontColoring }>세부정보</h6>
                            <div id={ BacklogAndSprintCSS.detailDiv }>
                                <p><label>카테고리</label><label>일반</label></p>
                                <p><label>상위 스프린트</label><Dropdown/></p>
                                <p><label>시작일</label><label>2020 20 20</label></p>
                                <p><label>종료일</label><label>2020 20 20</label></p>
                                <p><label>진행 상태</label><label>진행 전</label></p>
                                <p><label>긴급도</label><label>낮음</label></p>
                                <p><label>담당자</label><Dropdown/></p>
                            </div>
                            <h6 id={ BacklogAndSprintCSS.fontColoring }>댓글</h6>
                            <div>
                                <BacklogComment/>
                            </div>
                            <div id={ BacklogAndSprintCSS.newComment }>
                                <h6 id={ BacklogAndSprintCSS.fontColoring }>댓글 작성</h6>
                                <InputTextarea 
                                    id={ BacklogAndSprintCSS.inputComment }
                                    value={ content } 
                                    onChange={ (e) => setContent(e.target.value) } 
                                    rows={ 3 }
                                /><br/>
                                <Button 
                                    id={ BacklogAndSprintCSS.registCommentBtn } 
                                    label="등록"
                                    onClick={ () => alert('댓글 추가 api 요청') }
                                />
                            </div>
                        </div>
                    </Sidebar>
                </div>
            </div>
            <button id={ BacklogAndSprintCSS.readMoreBtn }
                onClick={ () => readMoreBacklogs() }
            >
                <i className="pi pi-fw pi-ellipsis-h"/> 더보기 
            </button><br/>
            <BacklogCreationModal/>
        </>
    );
}

export default Backlogs;