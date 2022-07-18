import BacklogAndSprintCSS from './BacklogAndSprint.module.css';
import SprintItem from './SprintItem';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { callGetSprintsAPI } from '../../../apis/SprintForBacklogAPICalls';

import { Button } from 'primereact/button';

function Sprints() {

    const { projectCode } = useParams();
    const sprints = useSelector(state => state.sprintsForBacklogReducer);
    const dispatch = useDispatch();

    const [sprintList, setSprintList] = useState([]);

    /* 스프린트 목록 조회 */
    useEffect(
        () => {
            // dispatch(callCleanSprints());
            dispatch(callGetSprintsAPI({
                projectCode: projectCode,
                offset: 0,
                limit: 10
            }));
        },
        []
        );

    useEffect(
        () => {
            setSprintList(sprints);
        },
        [sprints]
    );

    /* 스프린트 생성 */
    const createNewSprint = () => alert('스프린트 생성');
    
    return (
        <>
            <span className={ BacklogAndSprintCSS.divTitle }>스프린트</span>
            <Button
                label="스프린트 생성"
                id={ BacklogAndSprintCSS.createNewSprintBtn }
                onClick={ createNewSprint }
            />
            <hr className={ BacklogAndSprintCSS.divisionLine }/>
            {  
                sprints.length > 0
                ? <SprintItem/>
                : <div id={ BacklogAndSprintCSS.noSprint }>등록된 스프린트가 없습니다.</div>
            }
        </>
    );
}

export default Sprints;