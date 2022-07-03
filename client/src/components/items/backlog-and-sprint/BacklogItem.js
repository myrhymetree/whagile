import BacklogAndSprintCSS from './BacklogAndSprint.module.css';

function BacklogItem({visibleRight, setVisibleRight}) {

    return (
        <div className={ BacklogAndSprintCSS.backlogItem }>
            <label>기본</label>
            <label>백로그 제목제목제목제목</label>
            <label>진행 전</label>
            <label>긴급도</label>
            <label>담당자</label>
            <button onClick={() => setVisibleRight(true)}>자세히</button>
        </div>
    );
}

export default BacklogItem;