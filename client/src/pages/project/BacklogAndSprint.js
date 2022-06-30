import BacklogAndSprintCSS from '../../components/items/backlog-and-sprint/BacklogAndSprint.module.css';
import PageTitle from '../../components/items/PageTitle';
import Backlogs from '../../components/items/backlog-and-sprint/Backlogs';
import Sprints from '../../components/items/backlog-and-sprint/Sprints';
import EndSprints from '../../components/items/backlog-and-sprint/EndSprints';

function BacklogAndSprint() {

    return (
        <main>
            <section>
                <PageTitle
                    icon={ <i className="pi pi-fw pi-inbox"></i> }
                    text="백로그 및 스프린트"
                />
                <div className={ BacklogAndSprintCSS.pageDivision }>
                    <Backlogs/>
                </div>
                <div className={ BacklogAndSprintCSS.pageDivision }>
                    <Sprints/>
                </div>
                <div className={ BacklogAndSprintCSS.pageDivision }>
                    <EndSprints/>
                </div>
            </section>
        </main>
    );
}

export default BacklogAndSprint;