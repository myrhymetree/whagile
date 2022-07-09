import BacklogAndSprintCSS from './BacklogAndSprint.module.css';

function DivHeader() {

    return (
        <div id={ BacklogAndSprintCSS.divHeader }>
            <label>백로그번호</label>
            <label>구분</label>
            <label>제목</label>
            <label>진행상태</label>
            <label>긴급도</label>
            <label>생성자</label>
            <label>자세히</label>
        </div>
    );
}

export default DivHeader;