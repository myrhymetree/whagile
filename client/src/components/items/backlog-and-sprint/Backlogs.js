import BacklogAndSprintCSS from './BacklogAndSprint.module.css';

import DivHeader from '../../../components/items/backlog-and-sprint/DivHeader';
import BacklogCreationModal from './BacklogCreationModal';
import BacklogItem from './BacklogItem';
import BacklogComment from './BacklogComment';

import { useState } from 'react';

import { Sidebar} from 'primereact/sidebar';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

function Backlogs() {

    const [visibleRight, setVisibleRight] = useState(false);
    const [content, setContent] = useState('');

    return (
        <>
            <span className={ BacklogAndSprintCSS.divTitle }>3개의 백로그</span>
            <hr className={ BacklogAndSprintCSS.divisionLine }/>
            <div>
                filer area
            </div>
            <div>
                <DivHeader/>
                <div>
                    <BacklogItem visibleRight={ visibleRight } setVisibleRight={ setVisibleRight }/>
                    <Sidebar 
                        id={ BacklogAndSprintCSS.backlogDetail }
                        visible={visibleRight} 
                        position="right" 
                        onHide={() => setVisibleRight(false)}
                    >
                        <div id={ BacklogAndSprintCSS.backlogSummary }>
                        <h3>백로그 제목</h3>
                            <h5>설명</h5>
                            <p>설명입니다.</p>

                            <h5>세부정보</h5>
                            <div id={ BacklogAndSprintCSS.detailDiv }>
                                <label>카테고리</label><label>일반</label><br/>
                                <label>상위 스프린트</label><Dropdown/><br/>
                                <label>시작일</label><label>2020 20 20</label><br/>
                                <label>종료일</label><label>2020 20 20</label><br/>
                                <label>진행 상태</label><label>진행 전</label><br/>
                                <label>긴급도</label><label>낮음</label><br/>
                                <label>담당자</label><Dropdown/><br/>
                            </div>
                            <h5>댓글</h5>
                            <div>
                                <BacklogComment/>
                                <BacklogComment/>
                                <BacklogComment/>
                                <BacklogComment/>
                                <BacklogComment/>
                            </div>
                            <div id={ BacklogAndSprintCSS.newComment }>
                                <label>댓글 작성</label>
                                <InputTextarea 
                                    id={ BacklogAndSprintCSS.inputComment }
                                    value={ content } 
                                    onChange={ (e) => setContent(e.target.value) } 
                                    rows={3}
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
            <BacklogCreationModal/>
        </>
    );
}

export default Backlogs;