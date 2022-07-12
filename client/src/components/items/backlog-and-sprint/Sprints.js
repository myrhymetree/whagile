import BacklogAndSprintCSS from './BacklogAndSprint.module.css';
import SprintItem from './SprintItem';
import SprintCreationModal from './SprintCreationModal';

function Sprints() {

    return (
        <>
            <span className={ BacklogAndSprintCSS.divTitle }>종료된 스프린트</span>
            <SprintCreationModal id={ BacklogAndSprintCSS.sprintCreationBtn }/>
            <hr className={ BacklogAndSprintCSS.divisionLine }/>
            {/* 진행 중이거나 계획된 스프린트가 없을 경우 '진행 예정 / 진행 중인 스프린트가 없습니다. ' 출력 */}
            <SprintItem/>
        </>
    );
}

export default Sprints;