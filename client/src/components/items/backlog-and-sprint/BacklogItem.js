import BacklogAndSprintCSS from './BacklogAndSprint.module.css';

function BacklogItem({ visibleRight, setVisibleRight, backlog }) {

    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    console.log('backlog : ', backlog)
    console.log(backlog)
    // console.log(backlog.backlogCode)
    // console.log(backlog.backlogTitle)
    // console.log(backlog.progressStatus)

    return (
        <div className={ BacklogAndSprintCSS.backlogItem }>
            {/* <label>{ backlog.issue }</label>
            <label>{ backlog.backlogIitle }</label>
            <label>{ backlog.progressStatus }</label>
            <label>{ backlog.urgency }</label>
            <label>{ backlog.memberName }</label> */}
            <button onClick={() => setVisibleRight(true)}>자세히</button>
        </div>
    );
}

export default BacklogItem;