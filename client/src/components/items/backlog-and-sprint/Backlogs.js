import BacklogAndSprintCSS from './BacklogAndSprint.module.css';
import DivHeader from '../../../components/items/backlog-and-sprint/DivHeader';
import BacklogCreationModal from './BacklogCreationModal';

function Backlogs() {

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
                    n개 복제되어야할 녀석
                </div>
            </div>
            <BacklogCreationModal/>
        </>
    );
}

export default Backlogs;