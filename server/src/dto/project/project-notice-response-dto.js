class ProjectNoticeDTO {
    projectCode;            //프로젝트 번호
    content;                //공지내용
    creatorCode;            //작성자번호
    createdDate;            //작성날짜
    
    constructor(data) {
        this.projectCode = data.PROJECT_CODE;
        this.content = data.NOTICE_CONTENT;
        this.creatorCode = data.NOTICE_CREATOR;
        this.createdDate = data.NOTICE_CREATED_DATE
    }
}

module.exports = ProjectNoticeDTO;