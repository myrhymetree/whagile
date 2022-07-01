exports.selectBacklogComments = () => {

    return `
        SELECT
               A.BACKLOG_COMMENT_CODE
             , A.BACKLOG_COMMENT_CONTENT
             , A.BACKLOG_COMMENT_CREATED_DATE
             , A.BACKLOG_COMMENT_MODIFIED_DATE
             , A.BACKLOG_COMMENT_MODIFIED_YN
             , A.BACKLOG_COMMENT_DELETED_YN
             , A.BACKLOG_CODE
             , A.PROJECT_CODE
             , A.MEMBER_CODE
          FROM TBL_BACKLOG_COMMENT A
         WHERE A.BACKLOG_COMMENT_DELETED_YN = 'N'
           AND A.BACKLOG_CODE = ?
          LIMIT ?, ?
    `;
};