import { useEffect, useState } from 'react';

import BacklogAndSprintCSS from './BacklogAndSprint.module.css';
import DivHeader from "./DivHeader";
import SprintEditingModal from './SprintEditingModal';
import SprintStartModal from './SprintStartModal';
import SprintEndModal from './SprintEndModal';

function SprintItem() {

    const [isSelected, setIsSelected] = useState(false);    //스프린트 영역 선택

    //fake data
    const sprintInfo = {
        sprintProgressStatus: '진행 중' //스프린트 진행 상태
      , startDate: '2022-01-27'         //스프린트 시작 가능 여부
      , endDate: '2023-01-27'           //스프린트 종료일
    };

    const { sprintProgressStatus, startDate, endDate } = sprintInfo;

    const styles = {
        div: {display: isSelected? 'block' : 'none'},
        startBtn: {display: startDate != null && endDate && sprintProgressStatus == '진행 전'? 'block' : 'none'},
        endBtn: {display: sprintProgressStatus == '진행 중'? 'block' : 'none'}
    };

    return (
        <div className={ BacklogAndSprintCSS.sprintItem }>
            <div className={ BacklogAndSprintCSS.sprintItemHeader }>
                <button
                    className={ BacklogAndSprintCSS.sprintSelectBtn }
                    onClick={ () => setIsSelected(!isSelected) }
                >
                    <i className="pi pi-chevron-right"/>
                </button>
                <label> 스프린트제목</label>
                <label> 스프린트 기간</label>
                <SprintEditingModal/>
                <div style={ styles.startBtn }>
                    <SprintStartModal/>
                </div>
                <div style={ styles.endBtn }>
                    <SprintEndModal/>
                </div>
            </div>
            <div
                style={ styles.div }
            >
                <DivHeader/>
            </div>
        </div>
    );
}

export default SprintItem;