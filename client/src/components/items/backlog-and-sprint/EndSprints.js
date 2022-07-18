import BacklogAndSprintCSS from './BacklogAndSprint.module.css';
import SprintItem from './SprintItem';

function EndSprints() {

    return (
        <>
            <span className={ BacklogAndSprintCSS.divTitle }>종료된 스프린트</span>
            <hr className={ BacklogAndSprintCSS.divisionLine }/>
            {/* 종료된 스프린트가 없을 경우 '종료된 스프린트가 없습니다. ' 출력 */}
            <SprintItem/>
        </>
    );
}

export default EndSprints;