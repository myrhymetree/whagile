class ProjectDTO {
    projectCode;            //프로젝트 번호
    projectName;            //프로젝트 이름
    projectDescription;     //프로젝트 설명
    projectDeletedStatus;   //프로젝트 삭제여부
    projectOwner            //프로젝트 매니저
    
    constructor(data) {
        this.projectCode = data.PROJECT_CODE;
        this.projectName = data.PROJECT_NAME;
        this.projectDescription = data.PROJECT_DESCRIPTION;
        this.projectDeletedStatus = data.PROJECT_DELETED_STATUS
    }
}

module.exports = ProjectDTO;