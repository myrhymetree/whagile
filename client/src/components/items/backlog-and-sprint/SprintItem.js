import { useEffect, useState } from 'react';

import BacklogAndSprintCSS from './BacklogAndSprint.module.css';
import DivHeader from "./DivHeader";
import { Button } from 'primereact/button';

function SprintItem() {

    // combineReducer 사용해서 백로그 앤 스프린트 페이지에서 선언해주기?
    const [sprintItems, setSprintItems] = useState([{
        sprintCode: '',
        isSelected: false
    }]);

    useEffect(
        () => {
            console.log('sprintItems updated');
        },
        [sprintItems]
    );

    return (
        <div className={ BacklogAndSprintCSS.sprintItem }>
            <button
                className={ BacklogAndSprintCSS.sprintSelectBtn }
                onClick={ () => setSprintItems(!sprintItems.isSelected) }
            >
                <i className="pi pi-chevron-right"></i>
            </button>
            <label> 스프린트제목</label>
            <label> 스프린트 기간</label>
            <button>편집</button>
            <Button
                label="스프린트 생성"
            />
            <div>
                <DivHeader/>
                <h6>스프린트에 포함된 백로그행</h6>
            </div>
        </div>
    );
}

export default SprintItem;