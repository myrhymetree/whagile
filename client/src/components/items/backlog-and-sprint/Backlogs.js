import BacklogAndSprintCSS from './BacklogAndSprint.module.css';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DivHeader from './DivHeader';
import BacklogCreationModal from './BacklogCreationModal';
import BacklogDetails from './BacklogDetails';

import { Sidebar} from 'primereact/sidebar';
import { Dropdown } from 'primereact/dropdown';
import { callGetBacklogDetailsAPI, callGetBacklogsAPI } from '../../../apis/BacklogAPICalls';
import { callGetBacklogCommentsAPI } from '../../../apis/BacklogCommentAPICalls';

function Backlogs() {
    
    const dispatch = useDispatch();
    const backlogs = useSelector(state => state.backlogReducer);                //api에서 가져온 백로그 목록
    const backlogDetails = useSelector(state => state.backlogDetailReducer);    //api에서 가져온 백로그 목록
    const backlogComments = useSelector(state => state.bakclogCommentReducer);  //api에서 가져온 백로그 댓글 목록
    
    const [visibleRight, setVisibleRight] = useState(false);

    /* 페이징 */
    const [pageNo, setPageNo] = useState(0);                                    //백로그 목록
    const [backlogList, setBacklogList] = useState([]);
    const [commentOffset, setCommentOffset] = useState(0);                      //백로그 댓글 목록

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
            dispatch(callGetBacklogsAPI({
                'offset': pageNo,
                'limit': 10
            }));
            setBacklogList(backlogs);
        },
        [backlogList]
    );

    /* 목록 행 더보기 요청 onClick Handler fuction */
    const readMoreBacklogs = () => {
        dispatch(callGetBacklogsAPI(
            {
                'offset': pageNo, 
                'limit': 10 * (pageNo + 1)
            }
        ));
        console.log('more backlogs@@@@@@@@@@@@', backlogs)

        setPageNo(pageNo + 1);
        setBacklogList([...backlogList].concat(backlogs));
        console.log(backlogList)
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

    /* 백로그 상세내용 조회 요청 */
    const seeBacklogDetails = (backlogCode) => {
        dispatch(callGetBacklogDetailsAPI(backlogCode));
        dispatch(callGetBacklogCommentsAPI({
            backlogCode: backlogCode,
            offset: commentOffset,
            limit: 5
        }));
        setVisibleRight(true);
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
                 { 
                    backlogs === [] || backlogs === undefined? 
                    <div className={ BacklogAndSprintCSS.backlogItem }>
                        등록된 백로그가 없습니다.
                    </div> 
                    :
                    backlogs.map(backlog => 
                        <div 
                            className={ BacklogAndSprintCSS.backlogItem }
                            key={ backlog.backlogCode }
                        >
                            <label>{ backlog.issue === 1? '이슈' : '기본' }</label>
                            <label>{ backlog.backlogTitle }</label>
                            <label>{ backlog.progressStatus }</label>
                            <label>{ backlog.urgency }</label>
                            <label>{ backlog.memberName }</label>
                            <button 
                                id={ BacklogAndSprintCSS.moreDetailsBtn }
                                onClick={ () => seeBacklogDetails(backlog.backlogCode) }
                            >
                                자세히
                            </button>
                        </div>  
                    )
                }
                {/* { backlogList.map(backlog =>  
                    <div className={ BacklogAndSprintCSS.backlogItem }>
                        <label>{ backlog.backlogCode }</label>
                        <label>{ backlog.issue === 1? '이슈' : '기본' }</label>
                        <label>{ backlog.backlogTitle }</label>
                        <label>{ backlog.progressStatus }</label>
                        <label>{ backlog.urgency }</label>
                        <label>{ backlog.memberName }</label>
                        <button 
                            id={ BacklogAndSprintCSS.moreDetailsBtn }
                            onClick={ () => seeBacklogDetails(backlog.backlogCode) }
                        >
                            자세히
                        </button>
                    </div>  
                )} */}
                <BacklogDetails
                    visibleRight = { visibleRight }
                    setVisibleRight = { setVisibleRight }
                    // backlog = { backlogDetails[0] }
                    commentOffset = { commentOffset }
                    setCommentOffset = { setCommentOffset }
                />
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