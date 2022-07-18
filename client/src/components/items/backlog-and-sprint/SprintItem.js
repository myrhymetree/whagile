import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { callGetSprintsAPI, callCleanSprints } from '../../../apis/SprintForBacklogAPICalls';

import BacklogAndSprintCSS from './BacklogAndSprint.module.css';
import DivHeader from "./DivHeader";
import { Button } from 'primereact/button';

function SprintItem() {

    const { projectCode } =  useParams();
    const sprints = useSelector(state => state.sprintsForBacklogReducer);
    const dispatch = useDispatch();

    const [sprintItems, setSprintItems] = useState([{
        sprintCode: '',
        isSelected: false
    }]);

    // useEffect(
    //     () => {
    //         // dispatch(callCleanSprints());
    //         dispatch(callGetSprintsAPI({
    //             projectCode: projectCode,
    //             offset: 0,
    //             limit: 10
    //         }));
    //     },
    //     []
    // );

    return (
        <>
            {
                sprints.map(sprint => 
                    <div className={ BacklogAndSprintCSS.sprintItem }>
                        <button
                            className={ BacklogAndSprintCSS.sprintSelectBtn }
                            onClick={ () => setSprintItems(!sprintItems.isSelected) }
                        >
                        <i className="pi pi-chevron-right"/>
                        </button>
                        <label>{ sprint.sprintName }</label>
                        <label> 스프린트 기간</label>
                        <button>편집</button>
                        <div>
                            <DivHeader/>
                            <h6>스프린트에 포함된 백로그행</h6>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default SprintItem;