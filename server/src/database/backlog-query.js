exports.selectBacklogs = (params) => {

  return `
      SELECT 
            A.BACKLOG_CODE
          , A.BACKLOG_TITLE
          , A.BACKLOG_CATEGORY
          , A.BACKLOG_PROGRESS_STATUS
          , A.BACKLOG_URGENCY
          , A.BACKLOG_ISSUE
          , A.PROJECT_CODE
          , A.BACKLOG_CREATOR_CODE
          , C.MEMBER_NAME
        FROM TBL_BACKLOG A
        JOIN TBL_PROJECT_MEMBER B ON (A.PROJECT_CODE = B.PROJECT_CODE) AND (A.BACKLOG_CREATOR_CODE = B.MEMBER_CODE)
        JOIN TBL_MEMBER C ON (B.MEMBER_CODE = C.MEMBER_CODE)
      WHERE A.BACKLOG_DELETED_YN = 'N'
        AND A.BACKLOG_CATEGORY = '백로그'
      ORDER BY A.BACKLOG_CODE DESC
      LIMIT ${ params.offset }, ${ params.limit }
  `;
};