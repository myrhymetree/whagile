class BacklogDatailDTO {

    backlogCode;
    title;
    description;
    category;
    progressStatus;
    urgency;
    issue;
    creatorCode;
    creatorName;
    projectCode;
    deletedYN;

    constructor(data) {
        this.backlogCode = data.BACKLOG_CODE;
        this.title = data.BACKLOG_TITLE;
        this.description = data.BACKLOG_DESCRIPTION;
        this.category = data.BACKLOG_CATEGORY;
        this.progressStatus = data.BACKLOG_PROGRESS_STATUS;
        this.urgency = data.BACKLOG_URGENCY;
        this.issue = data.BACKLOG_ISSUE;
        this.creatorCode = data.BACKLOG_CREATOR_CODE;
        this.creatorName = data.MEMBER_NAME;
        this.projectCode = data.PROJECT_CODE;
        this.deletedYN = data.BACKLOG_DELETED_YN;
    };
}

module.exports = BacklogDatailDTO;